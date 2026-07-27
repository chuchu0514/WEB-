from flask import Flask, render_template, jsonify, request
from datetime import datetime

app = Flask(__name__)

records = [
    {"id": 1, "text": "영화 봤음", "date": "2026-07-20"},
    {"id": 2, "text": "카페 감", "date": "2026-07-22"}
]

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/time")
def show_time():
    return "지금은 " + str(datetime.now())

@app.route("/api/records", methods =["GET", "POST"])
def records_api():
    if request.method == "POST":
        data = request.get_json()
        records.append(data)
        return jsonify(data)

    return jsonify(records)


if __name__ == "__main__":
    app.run(debug=True)

    