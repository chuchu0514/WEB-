from flask import Flask, render_template, jsonify, request
from datetime import datetime
import json
import sqlite3

DB_NAME = "records.db"

def save_records():
    with open("records.json", "w", encoding="utf-8") as f:
        json.dump(records, f, ensure_ascii=False, indent=2)
    

def load_records():
    try:
        with open("records.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []

    
def get_conn():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS records(
            id INTEGER PRIMARY KEY,
            text TEXT NOT NULL,
            date TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

app = Flask(__name__)
init_db()
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

    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM records")
    rows = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in rows])

@app.route("/api/records/<int:record_id>", methods = ["DELETE"])
def delete_record(record_id):
    global records
    records = [r for r in records if r["id"] != record_id]
    save_records()
    return jsonify(records)

if __name__ == "__main__":
    app.run(debug=True)

    