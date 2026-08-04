# ⚙️ Backend 정리 (웹 원리 / Flask / 데이터)

> 서버에서 도는 코드와 웹이 돌아가는 원리에 대한 정리
> 브라우저 쪽(HTML/CSS/JS)은 `frontend.md` 참고

---

# 웹 동작 원리

## 클라이언트 / 서버

| 역할 | 뜻 | 우리 프로젝트 |
|---|---|---|
| 클라이언트 | 요청하는 쪽 | 브라우저(크롬) |
| 서버 | 응답하는 쪽 | 파이썬 프로그램(`app.py`) |

★ **요청은 항상 브라우저가 먼저 보낸다.** 서버는 절대 먼저 말 안 검
★ **서버 = 컴퓨터가 아니라 "요청을 기다리는 프로그램"**

```
프론트엔드 = 브라우저에서 도는 코드 (html/css/js)
백엔드     = 서버에서 도는 코드 (app.py)
```

### ⚠️ script.js는 브라우저가 아님

```
python.exe : my_script.py   =   크롬 : script.js
 (실행기)     (실행되는 코드)     (실행기)  (실행되는 코드)
```

★ **서버는 JS를 실행하지 않음.** 텍스트 파일로 보내줄 뿐, 실행은 브라우저가 함

## HTTP

**HyperText Transfer Protocol** = 웹에서 데이터 주고받는 **약속(protocol)**

서로 다른 프로그램(크롬 ↔ Flask)이 대화하려면 형식을 미리 정해둬야 함.

**요청**
```
GET /time HTTP/1.1          ← 메서드 / 경로 / 버전
Host: 127.0.0.1:5000        ← 헤더
                            ← 빈 줄
(본문)
```

**응답**
```
HTTP/1.1 200 OK             ← 버전 / 상태코드
Content-Type: text/html     ← 헤더
                            ← 빈 줄
지금은 2026-07-29...         ← 본문
```

★ 실제 네트워크로 날아가는 건 **이 "글자"가 전부**
※ `HTTP/1.1` = 약속의 버전 (1997년, 아직도 주력. 2, 3도 있음)

## IP vs DNS

비교 대상이 아니라 **층이 다름**.

| | 뜻 | 비유 |
|---|---|---|
| IP | 주소 그 자체 (`223.130.200.107`) | 전화번호 |
| DNS | 이름 → IP 변환 서비스 | 연락처 앱 |
| 도메인 | `naver.com` | "엄마" |

- DNS는 **실제로 존재하는 서버**. 접속 전에 브라우저가 물어봄
- `127.0.0.1`은 DNS 안 거침 (이미 번호를 아니까). 별명은 `localhost`

## ★ 포트 (port)

한 컴퓨터에서 프로그램 여러 개가 도니까 **구분 번호**가 필요.

```
IP   = 건물 주소  /  포트 = 호수
```

프로그램이 켜질 때 **"5000번 요청은 내가 받는다"** 고 점유.

| 프로그램 | 포트 |
|---|---|
| Flask | 5000 |
| Live Server | 5500 |
| MySQL | 3306 |
| http | 80 (생략됨) |
| https | 443 (생략됨) |

※ 같은 포트를 두 프로그램이 못 씀 → `Address already in use`

### 모든 프로그램이 서버는 아님

- 포트를 **여는 것** = "누가 요청 보내도 돼" (서버)
- 메모장, 계산기는 포트 안 엶
- **크롬도 서버 아님** — 요청을 보내는 쪽(클라이언트)
  - 임시번호(54821 같은 것)는 응답 돌려받는 용도지 문패가 아님

### 내 쪽에도 포트가 있다

```
서버 포트      5000    고정. 미리 정해둔 문패
클라이언트 포트 54821   임시. OS가 배정. 연결 끝나면 반납
```

→ 응답이 어느 탭으로 돌아갈지 구분하는 용도
※ 요청 봉투에 "보낸 곳"이 자동으로 붙어서, **서버는 내 주소를 미리 몰라도 됨**

### 포트는 어디에나 있다

네이버 서버도 그냥 컴퓨터. 웹서버가 80(또는 443)번 점유 중.

```
https://naver.com:443    ← 접속됨 (원래 이거였음)
https://naver.com:5000   ← 안 됨 (거기 아무도 없음)
```

## URL 해부

```
https://   claude.ai   (:443)   /chat/abc123
프로토콜    도메인       포트      경로(path)
```

- 앞 세 개는 **접속하는 데 쓰고 버림**
- Flask가 보는 건 **"경로"뿐** (브라우저가 이미 잘라서 보냄)

---

# 개발 환경

## 설치 계층

| | 정체 |
|---|---|
| ① Python 인터프리터 (`python.exe`) | 코드를 실행하는 프로그램 |
| ② venv | 프로젝트 전용 격리 환경 |
| ③ pip | 패키지 받아오는 도구 |
| ④ Flask | pip으로 받은 파이썬 라이브러리 |

⚠️ **언어(문법)와 실행기는 다른 것.** IDE는 파이썬을 갖고 있지 않음.
VS Code는 편집기일 뿐, 디스크의 `python.exe`를 대신 호출할 뿐.

## 가상환경 venv

파이썬 3.3+ **표준 기능** (따로 설치 X)

```bash
python -m venv venv       # -m = 모듈 실행. 앞 venv=모듈명, 뒤=폴더명
venv\Scripts\activate     # 터미널 설정 변경. (venv) 표시 = 켜짐
deactivate                # 끄기
```

- ⚠️ 터미널 새로 열면 **매번 다시 activate**
- ⚠️ 실체는 그냥 폴더:
  - `Scripts\python.exe` (복사본)
  - `Lib\site-packages\` (패키지 창고)
- ⚠️ `pip install flask` = site-packages에 파일 압축 푸는 것. **마법 아님**

**왜 쓰나**: 프로젝트마다 필요한 패키지 버전이 달라서 (A=Flask 2.0, B=3.0).
전역에 하나만 깔면 충돌.

## 환경 재현

```bash
pip freeze > requirements.txt      # 설치 목록 파일로 뽑기 (깃에 올림)
pip install -r requirements.txt    # 다른 PC에서 복원
```

⚠️ `venv` 폴더는 `.gitignore` (용량 크고 절대경로가 박혀 있어 이식 불가)

> **"환경은 옮기는 게 아니라 다시 만드는 것"**

**.gitignore**
```
venv/
__pycache__/
*.pyc
```

### 다른 PC에서 이어서 작업할 때

```bash
git pull
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

---

# Flask 기초

## app.py 뼈대

```python
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)      # 서버 객체 생성. __name__=파일 위치 알려줌

@app.route("/")
def home():
    return "안녕"

if __name__ == "__main__":     # 직접 실행할 때만 (import 시 서버 안 켜지게)
    app.run(debug=True)        # 포트 열고 무한 대기. 터미널 멈춘 게 정상
```

⚠️ `import *` 쓰지 말 것
- 이름 충돌 (조용히 덮어써짐)
- 출처 추적 불가
- 자동완성/오류검사 안 먹힘

⚠️ `app.run()`의 서버는 **개발용 장난감**. 배포는 gunicorn 등 사용

## ★ 라우팅 (routing)

= **"이 주소로 요청 오면 이 함수 실행해라"** 를 app의 표에 등록

```
"/"             →  home()
"/api/records"  →  records_api()
```

표에 없으면 **404**

★ `"/"` 는 문자 하나가 아니라 **주소 전체** (통째로 비교)
   `"/about"`은 `"/"`와 다른 문자열이므로 중복 아님
★ `127.0.0.1:5000` 접속 시 브라우저가 **자동으로 `/`를 붙임** (루트 경로)
★ **함수 이름과 주소는 무관** (관례상 맞춰 지을 뿐)
★ **함수의 `return` 값 = 브라우저에 보내는 응답**
   → 문자열 → HTML → JSON 순으로 발전

**동적 라우팅**
```python
@app.route("/chat/<chat_id>")   # 빈칸에 뭐가 와도 매칭
def show_chat(chat_id):
    return chat_id
```

## 정적 파일 규칙

```
프로젝트/
├── app.py
├── templates/    ← HTML (서버가 가공해서 보냄)
└── static/       ← css, js, 이미지 (그대로 보냄)
```

- `render_template("index.html")` → **`templates/` 안에서만** 찾음
- `static/` 경로는 라우트 없이 Flask가 자동 서빙

**HTML에서 경로 쓸 때**
```html
<link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
```

⚠️ `"/static/style.css"` 직접 써도 되지만 X
→ 주소가 바뀔 수 있으므로 **"직접 쓰지 말고 계산하게 하라"**

## render_template

= `templates/`에서 HTML 읽어서 응답으로 보냄

**"read"가 아니라 "render"인 이유**: 그냥 읽는 게 아니라
`{{ }}` 안을 **실행해서 결과로 치환**한 뒤 완성된 HTML을 만듦

```python
return render_template("index.html", name="진성")
```
```html
<h1>안녕 {{ name }}</h1>   →   <h1>안녕 진성</h1>
```

★ **브라우저는 Jinja2 문법을 모름.** 서버에서 처리하고 순수 HTML만 전송

| 방식 | 뜻 |
|---|---|
| SSR (서버 사이드 렌더링) | 서버가 데이터를 HTML에 박아서 보냄 |
| CSR (클라이언트 사이드) | 빈 HTML 보내고 JS가 fetch로 채움 ← **우리 방식** |

---

# HTTP 메서드 & REST

## 메서드

| 메서드 | 뜻 | 본문 |
|---|---|---|
| GET | 달라 (읽기) | 없음 |
| POST | 새로 만들어 (생성) | body에 데이터 실음 |
| PUT | 수정 | 있음 |
| DELETE | 삭제 | 보통 없음 |

★ **요청 = 주소 + 메서드** (한 쌍). 하나만으론 성립 안 함
- 주소 = **명사** (무엇을)
- 메서드 = **동사** (어떻게)
- `POST /api/records` vs `POST /api/users` → 주소가 대상을 지정

```python
@app.route("/api/records", methods=["GET", "POST"])
def records_api():
    if request.method == "POST":
        data = request.get_json()
        records.append(data)
        save_records()
        return jsonify(data)      # 저장 결과 확인서
    return jsonify(records)
```

⚠️ `methods` 안 적으면 GET만 받음 → POST 오면 **405**

## REST 설계

```
옛날: /getRecords  /addRecord  /deleteRecord   ← 주소에 동사, 무한 증식
REST: /api/records 하나 + 메서드로 구분
```

```
GET    /api/records     →  "기록들을 줘"
POST   /api/records     →  "기록들에 하나 추가해"
DELETE /api/records/5   →  "기록들 중 5번 지워"
```

## request 객체

Flask가 들어온 요청을 파싱해서 담아둠 (**내가 만드는 게 아님**)

```python
request.method       # "POST"
request.path         # "/api/records"
request.headers      # 헤더들
request.get_json()   # body를 파이썬 dict로  = json.loads 와 같은 일
```

## API

**Application Programming Interface** = 프로그램끼리 대화하는 창구

| 주소 | 대상 | 형식 |
|---|---|---|
| `/` | 사람이 볼 화면 | HTML |
| `/api/records` | 프로그램이 읽을 데이터 | JSON |

- `/api/`는 **기능이 아니라 관례** (주소만 보고 구분하려고)
- JSON 응답의 `\uc601` 같은 건 깨진 게 아니라 **유니코드 escape** (정상)

---

# 파일 입출력 (Python)

## ★ with 구문

```python
with open("records.json", "w", encoding="utf-8") as f:
    json.dump(records, f)
# 블록 벗어나면 자동으로 close (에러 나도 닫힘)
```

**C 비교**

| | |
|---|---|
| C | `FILE *f = fopen(...); ... ; fclose(f);` ← 빼먹으면 데이터 유실 |
| Python | `with`가 `fclose`를 자동 처리 |

⚠️ 파일 열 땐 **무조건 with**. 예외 없음

**모드**: `"w"` 쓰기(기존 내용 날림) / `"r"` 읽기 / `"a"` 이어쓰기

⚠️ `encoding="utf-8"` : 윈도우 기본은 cp949라 한글 깨짐 → **한글 다루면 필수**

## json.dump 옵션

```python
json.dump(records, f, ensure_ascii=False, indent=2)
```

- `ensure_ascii=False` : `\uc601` escape 대신 **한글 그대로** (사람이 열어볼 때)
- `indent=2` : 들여쓰기. 없으면 한 줄에 다 붙음

## 예외 처리

```python
def load_records():
    try:
        with open("records.json", "r", encoding="utf-8") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return []
```

**C 비교**

| | |
|---|---|
| C | 반환값 확인 → `if (f == NULL)` |
| Python | 예외 처리 → `except FileNotFoundError` |

★ **"파일이 없을 수도"** 까지는 쉽게 생각하지만
   **"있는데 내용이 비었/깨졌을 수도"** 를 놓치기 쉬움
   → 빈 파일이면 `FileNotFoundError`가 아니라 `JSONDecodeError`
   → **외부에서 오는 건 전부 의심** (파일 / 사용자 입력 / 네트워크 응답)

※ `except (A, B)` : 둘 중 하나라도 나면 = C의 `if (a || b)`

## ⚠️ 함수 반환값은 받아야 함

```python
load_records()              # 값이 허공에 버려짐. 변수 안 생김
records = load_records()    # ← 이렇게 받아야 씀
```

---

# 데이터 영속성

## ★ 메모리 vs 디스크

| | 속도 | 수명 |
|---|---|---|
| 메모리(RAM) | 빠름 | 프로세스 끝나면 **소멸** |
| 디스크 | 느림 | 남아있음 |

**계층이 하나 늘어남**

```
브라우저 records  = 화면용 사본
서버 records      = 작업용 (메모리)
records.json      = 진짜 원본 (디스크)  ★
```

**두 방향**

```
서버 켤 때      :  파일 → 메모리   (load_records)
기록 추가할 때  :  메모리 → 파일   (save_records)
```

## 왜 평소엔 메모리에서 작업하나

GET 올 때마다 파일 열고 읽고 파싱하면 느림
→ **읽기는 메모리, 쓰기는 양쪽**

## 왜 변경 즉시 저장하나

"종료할 때 한 번만"은 위험 — **정상 종료 보장이 없음**
(정전 / 강제종료 / 버그로 죽음 → 그때까지 데이터 전부 유실)

> ★ 원칙: **변경이 생기면 즉시 디스크에 쓴다**

※ DB의 **트랜잭션**이 이걸 더 정교하게 보장 → 아래 참고

---

# 데이터베이스 (SQL / SQLite)

## 왜 파일로는 안 되나 ★

`records.json` 방식의 한계 — 기록 10개면 문제없지만 커지면 무너짐:

| 문제 | 내용 |
|---|---|
| ① 검색이 느림 | 10만 개면 10만 번 비교 (DB는 **인덱스**로 몇 번 만에 끝) |
| ② 전체 로드 | 30개 보려고 10만 개를 메모리에 |
| ③ **동시 접근** | 둘이 동시에 쓰면 하나가 **조용히 증발** |
| ④ 무결성 없음 | `{"id": "안녕"}` 같은 게 저장돼도 못 막음 |

### ③이 제일 위험한 이유

```
A: 파일 읽음 [1,2,3]        B: 파일 읽음 [1,2,3]
A: 4 추가 → [1,2,3,4]       B: 5 추가 → [1,2,3,5]
A: 파일에 씀 [1,2,3,4]
                            B: 파일에 씀 [1,2,3,5]   ← 4가 사라짐!
```

**에러도 안 남.** 배포하는 순간 현실이 됨.

※ DB 인덱스는 **B-트리** 구조. 자료구조 시간에 배운 BST와 원리가 같음

## SQL — 선언적 언어

DB에게 말을 거는 **언어**. "어떻게 찾을지"를 안 적는 게 핵심.

```python
# 파이썬 (절차적) — 어떻게 할지 내가 지시
result = []
for r in records:
    if r["date"] == "2026-07-20":
        result.append(r)
```
```sql
-- SQL (선언적) — 뭘 원하는지만 말함
SELECT * FROM records WHERE date = '2026-07-20';
```

반복문을 돌지 인덱스를 탈지는 **DB가 알아서 최적으로 결정.**
→ SQL이 50년 넘게 살아남은 이유

## DBMS 종류

| | 구조 | 설치 |
|---|---|---|
| **SQLite** | `[파이썬] ─직접─> records.db 파일` | 불필요 (파이썬 내장) |
| MySQL | `[파이썬] ─네트워크(3306)─> [MySQL 서버]` | 필요 |
| PostgreSQL | `[파이썬] ─네트워크(5432)─> [PG 서버]` | 필요 |

- SQLite는 **서버가 없어서** "serverless DB"라고 부름 → 가볍고 배우기 좋음
- 안드로이드 앱, 크롬 브라우저도 내부적으로 SQLite 사용 (장난감 아님)
- 나중에 PostgreSQL로 옮겨도 **SQL 문법은 거의 그대로**

### 층 구분 ★

```
[파이썬 코드]   import sqlite3       ← 파이썬 표준 라이브러리 (다리 역할)
      ↓
[SQLite 엔진]   C로 짜인 프로그램     ← 실제로 파일을 읽고 쓰는 놈
      ↓
[records.db]    그냥 파일 (수동적)
```

- `sqlite3` 모듈 = **명령을 전달하는 창구** (파이썬)
- SQLite 엔진 = **실제 작업 수행부** (C). 속도 때문에 C로 짜임
- `.db` 파일은 기능이 없음. `.docx`가 뭘 하는 게 아니라 Word가 하는 것과 같음

※ 용어: **DBMS** = 관리 시스템(SQLite, MySQL) / **DB** = 저장소(`records.db`)

## 기본 흐름

```python
import sqlite3

conn = sqlite3.connect("records.db")   # 없으면 자동 생성
cursor = conn.cursor()
cursor.execute("SELECT * FROM records")
rows = cursor.fetchall()
conn.close()
```

**C의 파일 입출력과 같은 구조**

| C | Python DB |
|---|---|
| `FILE *f = fopen(...)` | `conn = sqlite3.connect(...)` |
| `fread(...)` | `cursor.execute(...)` |
| `fclose(f)` | `conn.close()` |

```
conn   = DB로 가는 전화선 (연결)
cursor = 그 선으로 말하고 듣는 사람 (실행 / 결과 수신)
```

`conn`만으론 연결만 된 상태. **`cursor`가 있어야 SQL을 날림**

### execute 다음에 fetch가 필요한 이유

`execute`는 명령을 날릴 뿐, 결과를 꺼내는 건 별도 단계

```python
cursor.fetchall()   # 전부 리스트로
cursor.fetchone()   # 한 행만 (COUNT 같은 것)
```

※ `response` → `response.json()` 이 두 단계였던 것과 같은 구조

## SQL 문법 (웹 CRUD에 쓰는 건 이게 전부)

```sql
-- 테이블 만들기
CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY,
    text TEXT NOT NULL,
    date TEXT NOT NULL
)

SELECT * FROM records                      -- 전체 조회
SELECT * FROM records WHERE date = ?       -- 조건 조회
SELECT * FROM records ORDER BY date DESC   -- 정렬 (ASC=오름차순, 기본값)
SELECT COUNT(*) FROM records               -- 개수 (집계 함수)

INSERT INTO records (text, date) VALUES (?, ?)
UPDATE records SET text = ? WHERE id = ?
DELETE FROM records WHERE id = ?
```

### 스키마 (schema)

미리 정해둔 **틀**. 파일 방식과의 결정적 차이.

```python
# JSON: 아무 모양이나 들어감
{"id": "안녕", "날짜": 12345, "이상한필드": [1,2,3]}   # 다 통과
```
```sql
-- DB: id는 INTEGER, text는 TEXT, 없는 열은 못 넣음
```

| 문법 | 뜻 |
|---|---|
| `IF NOT EXISTS` | 이미 있으면 만들지 마 (없으면 두 번째 실행 때 에러) |
| `INTEGER` / `TEXT` | 정수 / 문자열 |
| `PRIMARY KEY` | 고유 식별자. **중복 불가 + 자동 번호 부여** |
| `NOT NULL` | 비워둘 수 없음 |

★ `INTEGER PRIMARY KEY`면 INSERT 때 id를 안 넣어도 **1, 2, 3... 자동으로 붙음**
  → JS의 `Date.now()`로 id 만들 필요 없어짐. **id는 서버(DB)가 정한다**

★ `NOT NULL`은 JS의 `if (text === "") return;`을 **DB 차원에서 한 번 더** 막는 것
  → 브라우저 검증은 우회 가능하지만 DB는 못 뚫음

### 날짜를 문자열로 저장한 게 여기서 빛을 봄

`ORDER BY date`가 그대로 날짜순 정렬이 됨.
`padStart(2,"0")`을 쓴 이유 — `"7"`은 `"10"`보다 뒤로 가지만 `"07"`은 안전.

## commit / 트랜잭션 ★

```python
conn.commit()      # 확정
conn.rollback()    # 취소 (없던 일로)
```

| 명령 | commit |
|---|---|
| INSERT / UPDATE / DELETE / CREATE | **필요** ✅ |
| SELECT | 불필요 ❌ (읽기만 하니까) |

**DB는 명령을 실행해도 바로 확정하지 않음.** 임시 상태로 들고 있다가 commit을 받아야 진짜로 기록.

**왜 이런 구조냐** — 여러 작업을 하나로 묶어야 할 때가 있어서:

```
계좌이체:
  ① A에서 10만원 뺌
  ② B에 10만원 넣음
```

①만 되고 서버가 죽으면 **돈이 증발.**
→ **"전부 되거나, 전부 안 되거나"** 를 보장하는 게 **트랜잭션(transaction)**
→ DB가 파일보다 안전한 핵심 이유. 면접 단골

## row_factory

**문제**: SELECT 결과는 기본이 **튜플**

```python
(1, '영화 봤음', '2026-07-20')     # row[0], row[1] 로만 접근
```

이걸 `jsonify`로 보내면 JS가 받는 건 `[1, "영화 봤음", "2026-07-20"]` **배열**.
→ 우리 JS는 `record.text`를 기대하는데 `undefined`가 됨 → **프론트 전체가 깨짐**

**해결**

```python
conn.row_factory = sqlite3.Row     # 커서 만들기 전에 설정
```

```python
row["text"]     # 이름으로 접근 가능!
dict(row)       # {'id': 1, 'text': '영화 봤음', 'date': '2026-07-20'}
```

- `row_factory` = **"조회 결과를 어떤 모양으로 포장할지"** 정하는 설정 (공장의 틀)
- `sqlite3.Row`는 **열 이름 정보를 같이 들고 있음.** 튜플은 이름 정보가 없어서 위치로만 접근
- `sqlite3.Row`는 dict처럼 쓰이지만 **진짜 dict는 아님** → `jsonify` 하려면 `dict()` 변환 필요

```python
return jsonify([dict(row) for row in rows])
```

★ 이게 **예전에 `json.load`가 만들어주던 형태를 똑같이 맞추는 것**
  → 그래서 아래 흐름(jsonify → fetch → JS)이 하나도 안 바뀌고 **프론트를 안 고쳐도 됨**

## 연결은 요청마다 열고 닫는다 ★

```python
DB_NAME = "records.db"

def get_conn():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_conn()
    cursor = conn.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS records (...)")
    conn.commit()
    conn.close()
```

**왜 전역에 연결 하나를 두면 안 되나**

```
스크립트: 실행 → 작업 → 종료          ← "마지막에 닫기"가 가능
Flask:    실행 → 대기 → 요청 → 대기...  ← 끝나는 시점이 없음
```

그리고 Flask는 요청을 **여러 스레드에서 동시에** 처리함:

```
요청 A (스레드1) ┐
                 ├→ 같은 conn 사용 → 충돌
요청 B (스레드2) ┘
```

```
SQLite objects created in a thread can only be used in that same thread
```

→ **원칙: 자원은 필요할 때 열고, 다 쓰면 즉시 닫는다** (`with open`과 같은 감각)
※ SQLite는 파일이라 연결 비용이 거의 없음. MySQL은 비싸서 **커넥션 풀**을 씀

**`get_conn()`을 함수로 뺀 이유**: GET / POST / DELETE / init_db 모두에서 반복됨.
설정을 한 곳에서 관리 → `row_factory` 빼먹는 실수 방지

**`init_db()`가 필요한 이유**: 첫 실행 땐 테이블이 없어서 SELECT하면 터짐.
`except FileNotFoundError: return []` 와 같은 대비 — **"처음엔 없다"를 항상 준비**

## 마이그레이션 — API가 방패가 된다 ★

```
[브라우저]  ←→  /api/records  ←→  [app.py]  ←→  ❌ records.json
                                              ✅ records.db
                    ↑
              여기가 안 바뀜
```

저장소를 통째로 갈아치웠는데 **프론트엔드는 한 줄도 안 고침.**
→ 창구(API)가 고정돼 있으면 뒤에서 뭘 바꾸든 클라이언트는 몰라도 됨
→ 실무에서 DB를 교체하면서도 서비스가 안 멈추는 게 이 구조 덕분

**구조 변화**

```python
# 전
records = load_records()          # 전역 변수. 파일 전체를 메모리에
records.append(data); save_records()

# 후 — 전역 records 변수가 사라짐 ★
cursor.execute("INSERT INTO records (text, date) VALUES (?, ?)", (...))
conn.commit()
```

메모리에 들고 있을 이유가 없어짐 — **DB가 알아서 빠르게 찾아주니까**

```python
new_id = cursor.lastrowid    # 방금 INSERT된 행의 id (DB가 정한 값)
```

## `"""` vs `"`

```python
cursor.execute("SELECT * FROM records")        # 한 줄이면 " "

cursor.execute("""
    CREATE TABLE records (
        id INTEGER PRIMARY KEY
    )
""")                                            # 여러 줄이면 """ """
```

`"` 안에서는 줄바꿈 불가(문법 에러). 기능 차이 없고 **가독성 문제**.

---

# 보안 — SQL 인젝션 ★★

## 뚫리는 원리

```python
# ❌ 취약한 코드
query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
```

**정상 입력** `1234`
```sql
... AND password = '1234'
```

**공격 입력** `' OR '1'='1`
```sql
... AND password = '' OR '1'='1'
                   ↑↑    └── 명령으로 해석됨 ★
                   빈 문자열
```

- 공격자가 넣은 **첫 따옴표가 문자열을 조기 종료**시킴
- 그 순간부터 뒤에 쓴 글자는 데이터가 아니라 **명령**이 됨
- `'1'='1'`은 항상 참 → `OR`로 묶여서 전체가 참 → **비밀번호 없이 로그인 뚫림**

> **핵심: 데이터로 넣은 글자가 명령어로 해석돼버렸다**

같은 원리의 다른 공격: **XSS**(HTML에 스크립트 주입), **커맨드 인젝션**(OS 명령 주입)

### 따옴표가 두 겹인 이유

```python
query = "SELECT * FROM users WHERE username = 'jinsung'"
        ↑                                              ↑
        └──────── 파이썬의 따옴표 (문자열 경계) ─────────┘
                                              ↑        ↑
                                              └SQL의 따옴표┘
```

- 바깥 `"` → **파이썬 문법.** 값엔 안 들어감
- 안쪽 `'` → **SQL 문법.** 값에 글자로 포함돼서 SQLite에 전달됨

```python
print(query)
# SELECT * FROM users WHERE username = 'jinsung'
#                                      ↑ 안쪽 따옴표는 살아남음
```

## 방어 — 플레이스홀더 `?`

```python
cursor.execute("SELECT * FROM users WHERE username = ? AND password = ?", (username, password))
```

**명령과 데이터를 분리해서 전송**

```
① SQL 뼈대:  SELECT * FROM users WHERE username = ? AND password = ?
② 값들:      ("jinsung", "' OR '1'='1")
```

1. SQLite가 **①을 먼저 해석해서 문장 구조를 확정**
2. 그다음 ②를 **값으로만** 끼워넣음
3. 이미 구조가 굳었으므로 값 안에 따옴표든 `OR`든 **문법으로 안 읽힘**

```
SQLite: "비밀번호가 ' OR '1'='1 라는 글자인 사람을 찾으라는 거군"
      → 그런 사람 없음 → 로그인 실패 ✅
```

> **원칙: 명령과 데이터를 섞지 마라**

부가 효과: **따옴표 지옥이 사라짐.** 코드도 훨씬 읽기 좋음

## 값은 예외 없이 `?`

```python
# ❌ 전부 위험 — "문자열을 조립한다"면 방식이 뭐든 마찬가지
cursor.execute("... WHERE username = '" + username + "'")
cursor.execute(f"... WHERE username = '{username}'")        # f-string도 위험
cursor.execute("... WHERE username = '%s'" % username)
```

**왜 항상 쓰나**

1. **"이건 안전하니까 괜찮겠지"라는 판단이 자주 틀림** — 나중에 그 변수에 사용자 입력이 흘러들어옴
2. **성능도 더 좋음** — SQLite가 해석한 SQL 구조를 캐시해서 재사용
   ```
   "... WHERE id = ?"    뼈대 하나 → 100번 호출해도 해석 1번
   "... WHERE id = 1"    매번 다른 문장 → 매번 새로 해석
   ```

### ⚠️ `?`를 못 쓰는 자리

**값이 아닌 것**(테이블명, 열 이름)엔 못 씀 — 구조 자체를 바꾸는 자리라서

```python
cursor.execute("SELECT * FROM ?", ("records",))              # ❌
cursor.execute("SELECT * FROM records ORDER BY ?", ("date",)) # ❌
```

이럴 땐 **화이트리스트**로 검증:

```python
if sort_column not in ["date", "text", "id"]:
    raise ValueError("잘못된 정렬 기준")
query = f"SELECT * FROM records ORDER BY {sort_column}"
```

> 조립해도 되는 건 **내가 미리 정해둔 목록 안의 값뿐**

### 용어 (면접용)

- `?` = **플레이스홀더(placeholder)**
- 이 방식 전체 = **파라미터 바인딩(parameter binding)** / **prepared statement**

⚠️ 튜플 원소가 하나면 **쉼표 필수**: `("값",)` — 없으면 그냥 괄호로 인식됨

---

# 프론트-백 연결

## ★★ JSON 메소드 총정리

**원리: 방향은 두 개뿐** (객체→문자열 / 문자열→객체)
이름이 다른 건 **"상대"가 달라서** (문자열 / 파일 / 응답)

### ★ JSON = 타입이 아니라 "문자열로 표현하는 형식"

```python
'[{"id":1}]'    # JSON. 그냥 문자열. s[0] 하면 '[' 글자 하나
[{"id":1}]      # 진짜 자료구조. data[0]["id"] 접근 가능
```

### 세 형태 비교 — 생긴 건 거의 같음

```
JSON (문자열)
'[{"id": 1, "text": "영화", "done": true, "memo": null}]'

Python (리스트 + 딕셔너리)
[{"id": 1, "text": "영화", "done": True, "memo": None}]

JS (배열 + 객체)
[{id: 1, text: "영화", done: true, memo: null}]
```

| | JSON | Python | JS |
|---|---|---|---|
| 참/거짓 | `true` / `false` | `True` / `False` | `true` / `false` |
| 없음 | `null` | `None` | `null` |
| 키 따옴표 | **필수** | 필수 | 생략 가능 |
| 따옴표 종류 | **큰따옴표만** | `'` `"` 둘 다 | `'` `"` 둘 다 |
| 이름 | — | 리스트 / 딕셔너리 | 배열 / 객체 |

- JSON이 제일 빡빡함 (주석도 불가) — **여러 언어가 공유하는 형식이라 애매한 걸 다 없앰**
- `{id: 1, text: '영화'}` → JS로는 유효, **JSON으로는 무효**
- 파이썬의 리스트/딕셔너리 = JS의 배열/객체. **같은 것을 부르는 이름만 다름**
  → 그래서 JSON이 언어 사이 다리가 될 수 있음 (양쪽에 대응 자료구조가 있으니까)

★ 가장 중요한 차이는 형태가 아니라 **"무엇이냐"** — JSON만 글자, 나머지는 자료구조

★ **경계(파일/네트워크)를 넘을 땐 항상 문자열이 된다**
   (전선에 리스트를 실어보낼 방법이 없음)

### 파이썬

| 메소드 | 방향 |
|---|---|
| `json.dumps(obj)` | 객체 → 문자열 (s = string) |
| `json.loads(str)` | 문자열 → 객체 |
| `json.dump(obj, f)` | 객체 → 파일 |
| `json.load(f)` | 파일 → 객체 |
| `jsonify(obj)` | 객체 → 응답 (+ Content-Type 헤더 자동) |
| `request.get_json()` | 요청 본문 → 객체 |

※ `dump`/`load`는 "JSON을 다룬다"가 아니라 **방향 이름**
   `load` = 풀어서 파이썬 것으로 만든다

### JS

| 메소드 | 방향 |
|---|---|
| `JSON.stringify(obj)` | 객체 → 문자열 |
| `JSON.parse(str)` | 문자열 → 객체 |
| `response.json()` | 응답 본문 → 객체 |
| `response.text()` | 응답 본문 → 문자열 (파싱 안 함) |

※ 파일 버전 없음 (브라우저는 디스크 접근 불가 — 보안)

### 양쪽 대응표

| 하는 일 | 파이썬 | JS |
|---|---|---|
| 객체 → 문자열 | `json.dumps()` | `JSON.stringify()` |
| 문자열 → 객체 | `json.loads()` | `JSON.parse()` |
| 파일에 쓰기 | `json.dump()` | (없음) |
| 파일에서 읽기 | `json.load()` | (없음) |
| 응답 본문 파싱 | `request.get_json()` | `response.json()` |

## ★ response와 데이터는 다른 것

```js
const response = await fetch("/api/records");
// response = 응답 전체 (상태 + 헤더 + 본문). 본문은 아직 문자열
//   response.status / .ok / .headers / .body

const data = await response.json();
// 본문 꺼내기 + 파싱
```

`.json()` = `text()` + `JSON.parse()` 축약

```js
const t = await response.text();
const d = JSON.parse(t);      // ← 이 두 줄의 축약형
```

**왜 자동으로 안 해주나**: 본문이 항상 JSON은 아니라서
→ `.json()` / `.text()` / `.blob()` 중 **뭘로 해석할지 내가 정함**

**파싱 전에 검사할 수 있는 게 장점**
```js
if (!response.ok) { ... return; }    // 404/500 처리
const data = await response.json();
```
※ 우리 코드엔 아직 이 검사 없음. 예외처리 붙일 때 여기가 그 자리

## ★★ 연결점은 딱 두 군데

```
① JS의 body        →  파이썬의 request.get_json()    (브라우저 → 서버)
② 파이썬의 return  →  JS의 response.json()           (서버 → 브라우저)
```

그 외엔 서로를 볼 수 없음. **오직 JSON 문자열만 오감.**

## 데이터 흐름 전체 — 타입 표시

**파일 방식 (구버전)**

```
records.json (디스크)   '[{"id":1}]'          문자열
     ↓ json.load()
[서버] records          [{"id":1}]            파이썬 리스트 ★
     ↓ jsonify()
~~~ 네트워크 ~~~        '[{"id":1}]'          문자열
     ↓ response.json()
[브라우저] records      [{id:1}]              JS 배열 ★
     ↑ JSON.stringify()
~~~ 네트워크 ~~~                              문자열
     ↑ request.get_json()
[서버] data                                   파이썬 dict
```

**DB 방식 (현재)**

```
records.db (디스크)                           바이너리
     ↓ SELECT + row_factory
[서버] rows             <sqlite3.Row>         Row 객체들
     ↓ dict(row)
[서버] [{"id":1}]                             파이썬 리스트 ★  ← 여기부터 위와 동일
     ↓ jsonify()
~~~ 네트워크 ~~~        '[{"id":1}]'          문자열
     ↓ response.json()
[브라우저] records      [{id:1}]              JS 배열 ★
```

★ 표시한 곳만 **진짜 객체**. 네트워크/파일 구간은 전부 문자열
★ `dict(row)`를 하는 이유 = **예전 `json.load`가 만들던 형태를 맞추는 것**
  → 그 아래 흐름이 하나도 안 바뀌므로 **프론트 수정 0줄**

## ★★ 두 개의 records

`app.py`의 `records`와 `script.js`의 `records`는 **이름만 같고 완전 남남**

```
서버 records = 원본 (source of truth)
JS   records = 사본 (화면 그리려고 받아둔 것)
```

서로 직접 못 봄. 요청-응답으로만 대화.

## 데이터 흐름 원칙 — (b)방식 채택

| | 방식 | 문제 |
|---|---|---|
| (a) | 브라우저에도 push + 서버에도 전송 | 두 곳 각자 관리 → **어긋남 위험** |
| (b) | 서버에만 보내고 → 전체 다시 받아오기 | 항상 서버가 정답 ★ |

(a)는 **저장 실패했는데 화면엔 추가된 것처럼 보이는 사고**가 남.

```
POST → loadRecords() → records 통째 교체 → 렌더
※ 그래서 records.push()는 불필요 (어차피 덮어씌워짐)
```

**앞서 배운 단방향 데이터 흐름의 확장**

```
상태 바뀜 → 화면 전체 다시 그림
서버 바뀜 → 데이터 전체 다시 받음
```

---

# 디버깅

## ★ 터미널 로그 읽기 (내 습관 만들 것)

```
127.0.0.1 - -  [날짜]  "GET /time HTTP/1.1"  200  -
보낸곳IP        시각    요청 첫 줄 그대로     상태  크기
```

| 코드 | 뜻 |
|---|---|
| 200 | 성공 |
| 404 | 표에 없음 (라우트 미등록) |
| 405 | 메서드 안 맞음 (`methods` 누락) |
| 500 | 서버 코드에서 에러 |

- ※ `favicon.ico` 404는 크롬이 자동 요청한 것. 무시
- **브라우저는 결과만, 터미널은 "왜"를 보여줌**
- 서버 켜진 터미널은 입력 불가 → **터미널 추가로 열기(+)**

## debug=True의 정확한 의미

"버그를 고쳐준다"가 **아니라** "개발 모드":

1. 코드 저장 시 서버 자동 재시작 (reloader)
2. 에러 시 상세 정보 표시 (어디서 왜 터졌는지)
   - `debug=False` → "Internal Server Error" 한 줄만

★ **배포 시 필수로 끄기** (코드 내부가 그대로 노출됨 = 공격자에게 설계도)

※ "디버깅"은 더 넓은 뜻 — 로그 찍기, 브레이크포인트, 터미널 읽기 전부

## 어디서 막혔는지 찾는 순서

```
1. F12 Console에 빨간 에러?     → 브라우저 JS 문제 (요청이 안 나감)
2. 터미널에 요청 로그 있나?      → 없으면 요청 자체가 발사 안 됨
3. 로그에 500?                  → 서버 코드 문제. 터미널에 traceback 있음
4. 로그에 404/405?              → 라우트/메서드 등록 문제
5. 다 정상인데 화면이 그대로?    → 브라우저 캐시 (Ctrl+Shift+R)
```

## Network 탭 (F12) — fetch 디버깅의 주무대

⚠️ **열려 있는 동안 오간 요청만** 기록됨 → F12 열어둔 채로 새로고침해야 다 잡힘
※ `Fetch/XHR` 필터를 누르면 fetch 요청만 걸러서 볼 수 있음

요청 클릭하면:

| 탭 | 내용 |
|---|---|
| **Headers** | 봉투 (URL, 메서드, 상태코드, Content-Type) |
| **Response** | 내용물 (서버가 실제로 보낸 본문) |

```
Request URL:     http://127.0.0.1:5000/api/records
Request Method:  GET                     ← 메서드
Status Code:     200 OK                  ← 상태 코드
Content-Type:    application/json        ← jsonify가 붙여준 라벨 ★
Content-Length:  3                       ← 본문의 바이트 수 ("[]" + 줄바꿈)
Server:          Werkzeug/3.1.3 Python/3.13.14
```

- `Content-Type: application/json` — **`jsonify`를 쓰는 이유.**
  `json.dumps`만 썼으면 이 라벨이 없어서 브라우저가 그냥 텍스트로 봄
- `Content-Length`가 바이트 수인 것 = **본문이 문자열이라는 증거**
- `Server:` 로 서버 정보가 노출됨 → 배포할 땐 숨기는 항목

## 파이썬 대화형 모드 주의

```
C:\coding\WEB>        ← 터미널. 여기서 python app.py
>>>                   ← 파이썬 대화형 모드. 파이썬 코드만 가능
```

`python`만 치고 엔터하면 `>>>` 로 들어감. 나가려면 `exit()` 또는 `Ctrl+Z`

## 함수와 함수() 구분

```python
conn = get_conn      # ❌ 함수 객체 자체를 담음
conn = get_conn()    # ✅ 실행 결과를 담음
```

에러: `'function' object has no attribute 'cursor'`
→ **"conn에 연결이 아니라 함수가 들어갔다"** 는 뜻

※ JS에서 `addEventListener("click", 함수)` 할 때 괄호를 안 붙인 것과 같은 원리 (반대 방향)
