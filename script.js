const input = document.getElementById("date-input");
const addButton = document.getElementById("add-btn");
const list = document.getElementById("record-list");

addButton.addEventListener("click", function() {
    const text = input.value.trim();  

    if (text === "") {
        return;
    }

    const newItem = document.createElement("li");
    newItem.textContent = text;        

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "삭제";

    deleteButton.addEventListener("click", function(){
        newItem.remove();
    });

    newItem.appendChild(deleteButton);
    list.appendChild(newItem);
    input.value = "";
});

const feeling_input = document.getElementById("feeling-data");
const feeling_btn = document.getElementById("feeling-btn");
const feeling_box = document.getElementById("feeling");

feeling_btn.addEventListener("click", function(){

    const text = feeling_input.value.trim();

    if(text === "") return;

    const newItem = document.createElement("p");

    newItem.textContent = text;
    feeling_box.appendChild(newItem);
    feeling_input.value = "";
})