# 🎨 Frontend 정리 (HTML / CSS / JavaScript)

> 브라우저에서 도는 코드에 대한 정리
> 서버 쪽(Flask, HTTP, 파일 저장 등)은 `backend.md` 참고

---

# HTML

## 요소 종류

| 종류 | 예시 | 특징 |
|---|---|---|
| block | `div`, `p`, `h1`, `ul` | 한 줄 독차지 → 세로로 쌓임 |
| inline 계열 | `input`, `button` | 자기 폭만 차지 → 가로로 나란히 |

## class / id

- `class`는 띄어쓰기 금지, 하이픈으로 연결 (예: `date-card`)
- `class`는 중복 가능 (여러 요소가 공유)
- `id`는 고유 (문서에서 딱 하나)
- → 스타일 줄 땐 주로 class, 하나뿐인 건 id

## 공백 처리

HTML은 공백을 접는다 (whitespace collapsing).
화면엔 앞뒤/연속 공백이 안 보여도 **데이터엔 살아있음**.

→ 그래서 `.trim()`으로 직접 정제해야 함

> **"화면이 깨끗해 보여도 데이터는 더러울 수 있다"**

## 구조 vs 스타일

HTML 구조 변경은 마지막 수단.
CSS로 해결되는 걸 div 추가로 풀면 의미 없는 태그가 쌓임 (**"div 수프"**).

→ 구조는 의미, 배치는 CSS. **역할 분리**

## 하드코딩 vs JS 생성 — 판단 기준

> **"이 데이터가 변할 일이 있나?"**

- 요일 7개 → 절대 안 변함 → **HTML 하드코딩**
- 날짜 칸 → 달마다 28~31개 → **JS 생성**

⚠️ "반복되니까 무조건 JS"는 함정

---

# CSS

## 연결

```html
<link rel="stylesheet" href="style.css">   <!-- head 안에 -->
```

## 문법

```css
선택자 { 속성: 값; }
```

- class 선택은 앞에 점(`.`) → `.date-card`
- 줄 끝마다 세미콜론(`;`) 필수

## 자주 쓰는 속성

| 속성 | 뜻 |
|---|---|
| `background-color` | 배경색 |
| `color` | 글자색 |
| `padding` | 상자 **안쪽** 여백 |
| `margin` | 상자 **바깥쪽** 여백 |
| `border-radius` | 모서리 둥글기 |
| `font-size` | 글자 크기 |

**패딩 축약**
```css
padding: 8px;        /* 사방 8 */
padding: 8px 16px;   /* 위아래 8, 좌우 16 */
```

## 색상

- HEX 코드: `#RRGGBB` (빨강/초록/파랑 각 `00`~`ff`)
- 글자색은 순검정(`#000`)보다 살짝 회색(`#333`)이 눈에 편함

## 상속

- 글자 스타일(`color`, `font-size`)은 자식에게 흘러내림 → **상속 O**
- 상자 스타일(`background`, `padding`, `margin`)은 → **상속 X**

(파이썬 클래스 상속과 비슷 — 자식이 따로 정하면 그게 우선)

## Flexbox

```css
display: flex;
```

- 부모에 걸면 자식들 가로로 배치
- **정렬은 자식이 아니라 "부모"가 지휘한다**
- `justify-content`: `center` / `flex-start` / `flex-end` / `space-between` / `space-around`
- `gap`: 자식들 사이 간격

## Grid

```css
display: grid;
grid-template-columns: repeat(7, 1fr);   /* 7칸 균등 분할 */
```

- `1fr` = 남은 공간의 비율 단위
- ⚠️ 두 요소를 세로로 정렬하려면 `columns` / `gap` / 폭이 **모두** 같아야 함

## ★ 블록 요소의 폭

**블록 요소는 폭을 안 주면 부모를 꽉 채운다.**

→ 크기를 자식마다 정하지 말고 **부모 하나만 잡기**
   (부모 바뀌면 자식 전부 고쳐야 하는 상황 방지)

> "이 요소 폭 얼마로 하지?" 보다
> **"부모가 이미 정해주지 않았나?"** 를 먼저 묻기

## 중앙 정렬

```css
margin: 0 auto;   /* 위아래 0, 좌우 자동 = 가운데 */
```

- ⚠️ `max-width`가 있어야 작동 (폭이 꽉 차면 밀 공간이 없음)
- ⚠️ 부모가 가운데 가면 자식은 따라옴 (자식마다 정렬 X)

## 가상 클래스 (pseudo-class)

= "상태에 따른 조건부 스타일"

| 선택자 | 조건 |
|---|---|
| `:hover` | 마우스 올렸을 때 |
| `:active` | 누르는 중 |
| `:focus` | 입력창 선택됨 |

## 가상 요소 (pseudo-element)

```css
.has-record::after {
    content: "●";     /* content 속성 필수 */
}
```

⚠️ 콜론 2개 = 요소, 1개 = 클래스

## ★ 우선순위 (specificity)

```
id(#)  >  class(.)  >  태그
```

- **순서와 무관하게** id가 이김
- 같은 등급끼리는 **나중에 쓴 게 이김** (cascade)

⚠️ 실무: id는 스타일링에 잘 안 씀 (너무 세서 나중에 못 덮음)
→ `#add-btn` 보다 `.btn-primary` 같은 class 권장

## CSS 파일 정리

1. 화면에 보이는 순서대로 (HTML 순서와 맞추기)
2. 관련 규칙은 붙여 쓰기 (`.day` 바로 밑에 `.day:hover`, `.selected`)
3. 덜 구체적 → 더 구체적 (덮어쓰는 쪽이 아래로)

※ 300줄 넘으면 파일 분리 or CSS 변수(`--main-color`) 고려

## 스타일이 거짓말하지 않게

`cursor: pointer`는 **실제로 클릭되는 요소에만.**
클릭 안 되는데 손가락 커서 = 사용자 속이는 것.

---

# JavaScript — 기초

## 연결

```html
<script src="script.js"></script>   <!-- body의 제일 아래 -->
```

**이유**: JS가 조작할 요소(버튼 등)가 먼저 존재해야 하기 때문

## 변수

| 키워드 | 용도 |
|---|---|
| `const` | 값을 다시 안 바꿀 변수 (상수) |
| `let` | 값이 바뀌는 변수 |

- `const`/`let` = "변수를 만드는" 키워드 (담는 통을 준비)
- `new` = "객체를 만드는" 키워드 (통에 담을 물건을 생성)

## DOM

**DOM (Document Object Model)** = JS가 바라보는 웹페이지
= JS가 조작할 수 있는 "살아있는 화면"

⚠️ DOM을 바꿔도 `index.html` 파일 자체는 안 바뀜
   (새로고침하면 파일을 다시 읽어서 DOM 변경분은 사라짐)

## 글자 읽고 쓰기

```js
요소.textContent      // 일반 요소(p, h2, 버튼)의 글자
input.value           // 입력창의 값
input.value = ""      // 입력창 비우기
```

## ★핵심★ 이벤트 3단 패턴

```js
// 1. 요소 찾기
const btn = document.getElementById("add-btn");
// 2. 귀 달기
btn.addEventListener("click", function(){
    // 3. 반응
});
```

→ 모든 상호작용의 뼈대. 클릭/저장/삭제 다 이 패턴

## 요소 선택

```js
document.getElementById("id")     // id로 찾기
document.querySelector("li")      // 조건에 맞는 "첫 번째" 하나만
document.querySelectorAll("li")   // 조건에 맞는 "전부"
```

※ CSS 선택자 문법 그대로 사용 (`.class`, `li` 등)

## DOM 조작

```js
document.createElement("li")   // 새 요소 만들기 (아직 화면엔 없음)
부모.appendChild(자식)          // 자식으로 붙이기 (화면에 나타남)
요소.remove()                  // 요소 통째로 제거
요소.classList.add("selected") // class 추가
```

## 비교 연산자

```js
5 === "5"   // false  ← 항상 이걸 씀 (값도 타입도 같아야 참)
5 == "5"    // true   ← 함정. 타입을 멋대로 바꿔서 비교. 쓰지 말 것
```

## 세미콜론

```js
function 이름() { }         // 세미콜론 X (선언)
const x = function() { };   // 세미콜론 O (할당)
요소.addEventListener();    // 세미콜론 O (호출)
```

**원칙**: `{}`로 끝나는 선언은 X, 나머지 문장은 O

## 호이스팅

- `function` 선언은 미리 등록돼서 위치가 자유로움 (아래 있어도 위에서 호출 가능)
- 단, **실행문**(`loadRecords();`)은 재료(요소/변수)가 준비된 맨 아래에 둠

---

# JavaScript — 배열 & 데이터

## 배열 = 파이썬 리스트

| JS | 파이썬 | 설명 |
|---|---|---|
| `.push(값)` | `append` | 맨 끝에 추가 |
| `.length` | `len` | 개수 |
| `.forEach(함수)` | `for x in list` | 하나씩 반복 |
| `.indexOf(값)` | `index` | 위치 찾기 (없으면 -1) |
| `.splice(위치, 개수)` | — | 특정 위치의 것 제거 |
| `.filter(함수)` | 리스트 컴프리헨션 | 조건 맞는 것만 새 배열 |
| `.some(함수)` | `any` | 하나라도 맞으면 true |

※ `filter`, `some`은 **원본을 안 바꿈**. 새 결과를 반환

### ⚠️ 함정: indexOf는 "첫 번째" 값만 찾음

같은 값이 여러 개면 구분 못 함
→ **해결**: 각 데이터에 고유 `id`를 붙여서 id로 찾기

## Date 객체

```js
new Date()              // 현재 시각
new Date(년, 월, 일)     // 특정 날짜
```

| 메소드 | 반환 |
|---|---|
| `.getFullYear()` | 연도 |
| `.getMonth()` | **0부터!** (0=1월, 11=12월) |
| `.getDate()` | 며칠 |
| `.getDay()` | 무슨 요일 (0=일요일) |

### Date 트릭

```js
new Date(y, m+1, 0).getDate()   // 그 달의 마지막 날 (다음 달 0일 = 이번 달 말일)
new Date(y, m, 1).getDay()      // 그 달 1일의 요일 (앞 빈칸 개수)
```

※ 범위 초과 시 자동 조정 (month=12 → 다음 해 1월)

## 문자열 포맷

```js
String(숫자)         // 숫자 → 문자열
.padStart(2, "0")   // 앞을 채워 자릿수 맞춤 (7 → "07")
```

→ `"2026-07-08"` 형식 만들기. **날짜는 문자열 비교가 편함**

## localStorage (지금은 서버로 대체됨)

브라우저 저장 공간 (새로고침/재부팅해도 유지)

```js
localStorage.setItem("키", "값")   // 저장
localStorage.getItem("키")         // 꺼내기
```

- ⚠️ 문자열만 저장 가능 → 그래서 `JSON.stringify` 필요
- ⚠️ 첫 방문자는 저장된 게 없어서 `null` 반환 → null 체크 필요
- ⚠️ **내 브라우저에만 저장됨** → 다른 사람/다른 기기에선 안 보임
  → 그래서 서버로 옮긴 것 (`backend.md` 참고)

---

# JavaScript — 화면 그리기 사고방식

## ★ 상태(state) 변수

`selectedDate`, `currentYear`처럼 **"지금 화면이 무엇을 보여주는지"** 담는 변수.
데이터(`records`)와는 별개로 관리.

## ★★ 단방향 데이터 흐름

> **상태가 바뀌면 → 화면 전체를 다시 그린다 (render)**
> 필요한 부분만 콕 집어 고치지 않는다 (patch)

**나쁜 예**
```js
dayBox.classList.add("selected");   // 클릭한 칸에 직접
// → 이전 선택 지우는 코드를 따로 관리해야 함
```

**좋은 예**
```js
selectedDate = dateStr;                      // 상태만 바꾸고
renderCalendar(currentYear, currentMonth);   // 다시 그림
// → 지웠다 새로 그리니 이전 상태가 남을 수 없음
```

> **"화면은 상태의 결과물이다"** — React 등 현대 프레임워크의 핵심 사상

---

# 비동기 & 서버 통신

## fetch

= **화면 안 바꾸고 데이터만 받아오는 요청**

| 방식 | 결과 |
|---|---|
| 주소창 입력 | 응답을 화면에 표시 (페이지 바뀜) |
| `fetch` | 응답을 JS 변수에 담음 (화면 그대로) |

※ 서버 입장에선 둘이 구분 안 됨. **똑같은 요청**

```js
fetch("/api/records")                     // 옵션 없으면 GET (기본값)

fetch("/api/records", {
    method: "POST",
    headers: {"Content-Type": "application/json"},  // 내용물 라벨
    body: JSON.stringify(record)                    // 보낼 물건
})
```

## ★ 비동기 async / await

**JS는 스레드가 하나** → 기다리면 화면 전체가 얼어붙음

비동기 = 동시 실행(멀티스레드)이 **아니라** "대기 시간 활용"

| | 비유 |
|---|---|
| 멀티스레드 | 요리사 2명 (진짜 동시) |
| 비동기 | 요리사 1명, 물 끓는 동안 야채 썲 |

- `await` = 그 **함수만** 일시정지, 스레드는 다른 일 하러 감
- `async` = await를 쓸 수 있게 하는 **허가증**

★ `async`는 **"await가 적힌 그 함수"** 에 붙임 (호출하는 쪽 아님)
★ async 함수를 `await` 없이 호출만 하면 async 불필요

```js
async function loadRecords(){
    const response = await fetch("/api/records");  // ① 응답 대기
    const data = await response.json();            // ② 본문 해석 대기
    records = data;
    renderCalendar(currentYear, currentMonth);     // 데이터 도착 후에 그려야 함
}
```

### 실행 순서

**함수 "안"은 순서대로 실행됨. 함수 "밖"이 먼저 실행될 뿐.**

```
1 → 3 → 2 → 4 → 5
(호출 전 → 함수시작 → 호출 후 → 응답도착 → 완료)
```

## response ≠ 데이터

```js
const response = await fetch("/api/records");
// response = 응답 전체 (상태 + 헤더 + 본문). 본문은 아직 문자열

const data = await response.json();
// 본문만 꺼내서 → JS 객체로 파싱
```

자세한 건 `backend.md`의 **JSON 메소드 총정리** 참고.

---

# 브라우저 동작

## ★ 캐시 (삽질 방지)

CSS/JS 고쳤는데 화면이 그대로면 **십중팔구 캐시**.

```
Ctrl + Shift + R    ← 캐시 무시 강제 새로고침
```

※ Flask `debug=True`는 **파이썬만** 자동 반영.
   `static/` 파일은 브라우저 캐시 관할이라 별개.

## 개발자 도구 (F12)

| 탭 | 용도 |
|---|---|
| Console | JS 에러, `console.log` 출력 |
| Elements | 현재 DOM 상태 확인 |
| Network | 오간 요청/응답 확인 (fetch 디버깅) |

---

# 코드 정리 원칙

## 관심사 분리

"종류별(변수 따로, 함수 따로)"이 아니라
**"기능별(기록 뭉치, 달력 뭉치)"** 로 묶어라

→ 관련된 건 가까이 있어야 고치기 쉬움 (**응집도**)
→ 여러 기능이 공유하는 것만 위쪽 공통 구역에

## 주석

- ❌ 코드를 반복하는 주석 (`// text 추가` ← 이런 거)
- ✅ **"왜(why)"** 를 적는 주석 (`// localStorage는 문자열만 되니까 변환`)
- 💡 좋은 이름이 최고의 주석 (`input`, `saveRecords`처럼)

## 이름 관례

```js
feelingInput      // JS는 카멜케이스 (O)
feeling_input     // 파이썬 snake_case → JS에선 지양
```
