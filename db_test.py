import sqlite3

conn = sqlite3.connect(":memory:")
cursor = conn.cursor()
cursor.execute("CREATE TABLE records (id INTEGER PRIMARY KEY, text TEXT, date TEXT)")
cursor.execute("INSERT INTO records (text, date) VALUES ('영화', '2026-07-20')")
conn.commit()

# ===== row_factory 없이 =====
cursor.execute("SELECT * FROM records")
row = cursor.fetchone()
print("없을 때:", row)
print("타입:", type(row))
print("접근:", row[1])
# print(row["text"])    ← 이거 주석 풀면 에러 남

# ===== row_factory 켜고 =====
conn.row_factory = sqlite3.Row
cursor = conn.cursor()          # 커서를 새로 만들어야 적용됨
cursor.execute("SELECT * FROM records")
row = cursor.fetchone()
print("있을 때:", row)
print("타입:", type(row))
print("접근:", row["text"])     # ← 이름으로 됨!

conn.close()