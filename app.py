from flask import Flask, render_template, jsonify, request
from datetime import datetime
import json

def save_records():
    with open("records.json", "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)
    

def load_records():
    try:
        with open("records.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

    

app = Flask(__name__)

records = load_records()

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
        save_records()
        return jsonify(data)

    return jsonify(records)


if __name__ == "__main__":
    app.run(debug=True)

    