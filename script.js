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

}

// 이벤트

//기록추가
addButton.addEventListener("click", function() {
    const text = input.value.trim();  

    if (text === "") {
        return;
    }

    if(selectedDate === null){
        alert("날짜를 먼저 선택해주세요");
        return;
    }


    const record = { id: Date.now(), text: text, date: selectedDate};
    records.push(record);
    saveRecords();
    renderRecordsBydate();

    
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
let selectedDate = null;

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");


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
            const monthStr = String(month + 1).padStart(2, "0");
            const dayStr = String(day).padStart(2, "0");
            selectedDate = year + "-" + monthStr + "-" + dayStr;

            const dateTitle = document.getElementById("selected-date-title");
            dateTitle.textContent = selectedDate + " 기록";
            renderRecordsBydate();
        });

        calendar.appendChild(dayBox);
    }
}

function renderRecordsBydate(){
    list.innerHTML = "";

    const filtered = records.filter(function(record){
    return record.date === selectedDate;
    });
    filtered.forEach(function(record){
        renderRecord(record);
    })
}
//이벤트

prevBtn.addEventListener("click", function(){
    currentMonth = currentMonth - 1;
    renderCalendar(currentYear, currentMonth);
});

nextBtn.addEventListener("click", function(){
    currentMonth = currentMonth + 1;
    renderCalendar(currentYear, currentMonth);
});

// ===================================
//  실행
// ===================================
loadRecords();
renderCalendar(currentYear, currentMonth);