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

※ DB의 **트랜잭션**이 이걸 더 정교하게 보장 (Week 4-5)

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

★ 표시한 두 곳만 **진짜 객체**. 나머지 구간은 전부 문자열

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
