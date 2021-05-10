import base64
import os

from flask import Flask
from flask import request
from check_smile import isSmile

app = Flask(__name__)

imgIndex = 0


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/getImg', methods=['POST'])
def get_img():
    base64Img = request.form['a']
    imgPath = "./img/" + str(imgIndex) + ".jpg"
    print(imgPath)
    with open(imgPath, 'wb') as f:
        f.write(base64.b64decode(base64Img))
    if isSmile(imgPath) == 1:
        return "isSmile"
    else:
        # os.remove(imgPath)
        return 'notSmile'


if __name__ == '__main__':
    app.run()
