#!/usr/bin/env python
from threading import Lock
from flask import Flask, render_template, session, request, \
    copy_current_request_context, make_response
from flask_socketio import SocketIO, emit, join_room, leave_room, \
    close_room, rooms, disconnect
from flask_cors import *
import json

# Set this variable to "threading", "eventlet" or "gevent" to test the
# different async modes, or leave it set to None for the application to choose
# the best option based on installed packages.
async_mode = None

app = Flask(__name__)
# app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app, async_mode=async_mode, cors_allowed_origins='*',
                    ssl_context=(
                        "cert/cert.pem",
                        "cert/key.pem"
                    ))

thread = None
thread_lock = Lock()

@app.after_request
def cors(environ):
    environ.headers['Access-Control-Allow-Origin'] = 'https://localhost:8020'
    environ.headers['Access-Control-Allow-Method'] = '*'
    environ.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, content-Type, Accept, Authorization'
    environ.headers['Access-Control-Allow-Credentials'] = 'true'
    return environ


def background_thread():
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        socketio.sleep(10)
        count += 1
        socketio.emit('my_response',
                      {'data': 'Server generated event', 'count': count})



@app.route('/')
def index():
    return render_template('index.html', async_mode=socketio.async_mode)

'''
获取视频列表
'''
@app.route('/video_list', methods=['GET'])
def videoList():
    with open('static/info.json','r',encoding='utf-8') as fp:
        json_data = json.load(fp)
        response = make_response(json.dumps(json_data), 200)
        return response



@socketio.event
def my_event(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']})


@socketio.event
def my_broadcast_event(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']},
         broadcast=True)


# 加入房间
@socketio.event
def join(message):
    join_room(message['room'])
    session['receive_count'] = session.get('receive_count', 0) + 1
    print('join', message['room'])
    emit('my_response',
         {'data': 'In rooms: ' + ', '.join(rooms()),
          'count': session['receive_count']})


# 离开房间
@socketio.event
def leave(message):
    leave_room(message['room'])
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'In rooms: ' + ', '.join(rooms()),
          'count': session['receive_count']})


# 关闭房间
@socketio.on('close_room')
def on_close_room(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response', {'data': 'Room ' + message['room'] + ' is closing.',
                         'count': session['receive_count']},
         to=message['room'])
    close_room(message['room'])


# 给房间发送信息
@socketio.event
def my_room_event(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']},
         to=message['room'])


@socketio.event
def video_seeking(message):
    emit('seeking_response',
         {'time': message['time'], 'uid':message['uid']}, to=message['room'])


@socketio.event
def video_play(message):
    emit('play_response',
         {'uid':message['uid']}, to=message['room'])


@socketio.event
def video_pause(message):
    emit('pause_response',
         {'uid':message['uid']}, to=message['room'])


@socketio.event
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()

    session['receive_count'] = session.get('receive_count', 0) + 1
    # for this emit we use a callback function
    # when the callback function is invoked we know that the message has been
    # received and it is safe to disconnect
    emit('my_response',
         {'data': 'Disconnected!', 'count': session['receive_count']},
         callback=can_disconnect)


@socketio.event
def my_ping():
    emit('my_pong')


@socketio.event
def connect():
    # global thread
    # with thread_lock:
    #     if thread is None:
    #         thread = socketio.start_background_task(background_thread)
    emit('my_response', {'data': 'Connected', 'count': 0})


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected', request.sid)


if __name__ == '__main__':
    socketio.run(app)
