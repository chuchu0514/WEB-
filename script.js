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
function renderRecord(text){
    const newItem = document.createElement("li");
    newItem.textContent = text;        

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";
    deleteButton.addEventListener("click", function(){
        newItem.remove();

        const index = records.indexOf(text);
        records.splice(index, 1);
        saveRecords();
    });

    newItem.appendChild(deleteButton);
    list.appendChild(newItem);
}
function loadRecords(){
    const saved = localStorage.getItem("records");
    if(saved == null) return;

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

    records.push(text);
    saveRecords();
    renderRecord(text);


    input.value = "";
});


// ===================================
//  기분 기능
// ===================================

// 요소
const feeling_input = document.getElementById("feeling-data");
const feeling_btn = document.getElementById("feeling-btn");
const feeling_box = document.getElementById("feeling");

// 이벤트
feeling_btn.addEventListener("click", function(){

    const text = feeling_input.value.trim();

    if(text === "") return;

    const newItem = document.createElement("p");

    newItem.textContent = text;
    feeling_box.appendChild(newItem);
    feeling_input.value = "";
})

// ===================================
//  실행
// ===================================
loadRecords();