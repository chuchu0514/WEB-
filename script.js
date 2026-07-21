// ===== 공통 =====
let records = [];

// ===================================
//  기록 기능
// ===================================

// 요소
const input = document.getElementById("date-input");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("record-list");

// 함수
function saveRecords(){
    localStorage.setItem("records", JSON.stringify(records));
}
function renderRecord(record){
    const newItem = document.createElement("li");
    newItem.textContent = record.text;        

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", function(){
        newItem.remove();

        const index = records.indexOf(record);
        records.splice(index, 1);
        saveRecords();
    });

    newItem.appendChild(deleteButton);
    list.appendChild(newItem);
}
function loadRecords(){
    const saved = localStorage.getItem("records");
    if(saved === null) return;

    records = JSON.parse(saved);
    records.forEach(function(record){
        renderRecord(record);
    })
}

// 이벤트
addButton.addEventListener("click", function() {
    const text = input.value.trim();  

    if (text === "") {
        return;
    }

    const record = { id: Date.now(), text: text};
    records.push(record);
    saveRecords();
    renderRecord(record);


    input.value = "";
});


// ===================================
//  달력 기능
// ===================================

//요소
const calendar = document.getElementById("calendar");
const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

prevBtn.addEventListener("click", function(){
    currentMonth = currentMonth - 1;
    renderCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener("click", function(){
    currentMonth = currentMonth + 1;
    renderCalendar(currentYear, currentMonth);
});

//함수
function renderCalendar(year, month){
    calendar.innerHTML= "";

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month +1 , 0).getDate();
    const title = document.getElementById("calendar-title");
    title.textContent = year + "년 " + (month + 1) + "월";

        //1일 앞의 빈칸 추가
    for(let i = 0; i < firstDay; i++){
        const emptybox = document.createElement("div");
        emptybox.className = "day";
        calendar.appendChild(emptybox);
    }

    //daybox 
    for(let day = 1; day <= lastDate; day++){
        const dayBox = document.createElement("div");
        dayBox.className = "day";
        dayBox.textContent = day;

        dayBox.addEventListener("click", function(){
            console.log(day + "일을 클릭했어요.");
        });

        calendar.appendChild(dayBox);
    }
}

// ===================================
//  실행
// ===================================
loadRecords();
renderCalendar(currentYear, currentMonth);