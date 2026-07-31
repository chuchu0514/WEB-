import sqlite3

# 1. 연결 (파일이 없으면 자동 생성됨)
conn = sqlite3.connect("test.db")
cursor = conn.cursor()

# 2. 표 만들기
cursor.execute("""
    CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY,
        text TEXT NOT NULL,
        date TEXT NOT NULL
    )
""")

# 3. 넣기
cursor.execute("INSERT INTO records (text, date) VALUES (?, ?)", ("영화 봤음", "2026-07-20"))
cursor.execute("INSERT INTO records (text, date) VALUES (?, ?)", ("카페 감", "2026-07-22"))

cursor.execute("UPDATE records SET text = ? WHERE id = ?", ("영화 다시 봄", 2))
conn.commit()

# 4. 저장 확정
conn.commit()

# 5. 읽기
cursor.execute("SELECT * FROM records ORDER BY date DESC")
rows = cursor.fetchall()
for row in rows:
    print(row)
    
conn.close()