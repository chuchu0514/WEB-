from flask import Flask
from datetime import datetime

app = Flask(__name__)

@app.route("/")
def home():
    return "안녕 진성아"

@app.route("/time")
def show_time():
    return "지금은 " + str(datetime.now())


if __name__ == "__main__":
    app.run(debug=True)