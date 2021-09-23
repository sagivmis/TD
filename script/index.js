const todoListElement = document.getElementById("todo");
const itemsLeft = document.getElementById("items-left");
const newTaskUlElement = document.getElementById("new-task");
const stateMenuElement = document.getElementById("states");
const mobileStateMenuElement = document.getElementById("mobile-state-menu");
const actionMenuElement = document.getElementById("actions");
const clearCompleted = document.getElementById("clear-completed");
const listFooter = document.getElementById("list-footer")
clearCompleted.addEventListener("click", ClearCompleted);

Reload(GetActiveStateId());
LoadListFooter();

let newTodo = document.getElementById(`new-todo-item ${tasks.length}`)
let newTaskTextInputField = GetTaskTextInputField();

AddDraggableListeners();

// suppose i get an array of tasks that got id, task and a status

FetchRestAPI();

const modeIcon = document.getElementById("mode-icon");
modeIcon.onclick = SetNightMode;
modeIcon.src = "images/icon-moon.svg"