from flask import make_response, jsonify, request, send_file
from video.api import api
import json
import os
from flask_cors import cross_origin
import glob


# 测试
@api.route('/v1.0/homePage/', methods=['GET','POST'])
def homepage():
    return 'Hello World'

@api.after_request
def cors(environ):
    environ.headers['Access-Control-Allow-Origin'] = 'https://localhost:8020'
    environ.headers['Access-Control-Allow-Method'] = '*'
    environ.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, content-Type, Accept, Authorization'
    environ.headers['Access-Control-Allow-Credentials'] = 'true'
    return environ

'''
获取视频列表
'''
@api.route('/video_list', methods=['GET'])
def videoList():
    with open('video/static/info.json','r',encoding='utf-8') as fp:
        json_data = json.load(fp)
        print(json_data)
        response = make_response(json_data, 200)
        return response


'''
获得音频标注任务信息
'''
@api.route('/audio_task', methods=['GET'])
def audioTask():
    task_id = request.args['id']
    dictionary = dict()
    dictionary['id'] = task_id
    # 如果找不到此任务，则返回失败
    if False:
        return make_response(jsonify({'error':'任务不存在'}), 404)
    # 从项目管理系统获取任务名，标签集以及音频集
    dictionary['name'] = '测试任务'
    dictionary['labels'] = ['二胡','琵琶','古琴','电音','鼓点']
    # dictionary['audios'] = ['project1/audio/1.mp3', 'project1/audio/2.mp3', 'project1/audio/3.mp3']
    dictionary['audios'] = []
    for root, dirs, files in os.walk('audio/static/project1/audio'):
        for f in files:
            dictionary['audios'].append('project1/audio/'+f)

    # 获取当前标注总数
    path_file_number = glob.glob(pathname='audio/static/project1/labels/*.json')
    dictionary['labeled'] = len(path_file_number)

    response = make_response(jsonify(dictionary), 200)
    return response

'''
保存标注信息
'''
@api.route('/annotation', methods=['POST'])
def saveAnnotation():
    data = request.get_json()

    # 保存json到文件夹
    try:
        filename = 'audio/static/project1/labels/' + data['audio'] + '.json'
        f = open(filename, 'w', encoding='utf-8')
        f.write(data['labels'])
    except IOError:
        return make_response(jsonify({'error':'文件读取失败'}), 400)
    else:
        f.close()

    # 获取当前标注总数
    path_file_number = glob.glob(pathname='audio/static/project1/labels/*.json')

    # 判断是否没有标注信息
    if data['labels'] == '[]':
        return make_response(jsonify({'info': '已清空当前标注结果', 'number':len(path_file_number)}), 201)
    else:
        return make_response(jsonify({'info': '标注提交成功', 'number':len(path_file_number)}), 201)


