const input = document.getElementById("date-input");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("record-list");

addButton.addEventListener("click", function() {
    const text = input.value.trim();   // 앞뒤 공백 뗀 값을 한 번만 만들어 재사용

    if (text === "") {
        return;
    }

    const newItem = document.createElement("li");
    newItem.textContent = text;        // 깔끔한 값으로 저장
    list.appendChild(newItem);
    input.value = "";
});