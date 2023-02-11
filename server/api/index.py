import json
from flask import Flask, request, jsonify
from util import process

app = Flask(__name__)


@app.route('/')
def home():
    return "Hello world"


@app.route('/', method=['POST'])
def index():
    """data=requests.json"""

    f = open('./package.json')
    loader = json.load(f)

    return process(loader)


# if __name__ == '__main__':
#     app.run()
