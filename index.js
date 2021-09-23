tasks=[
    {
        id:0,
        task: "HTML",
        status: true,
    },
    
    {
        id:1,
        task: "UI",
        status: true,
    },
    {
        id:2,
        task: "Clear Completed Button",
        status: true,
    },
    {
        id:3,
        task: "Functionality of states",
        status: true,
    },
    {
        id:4,
        task: "Fix checkbox appearance",
        status: false,
    },
    {
        id:5,
        task: "Drag and Drop API",
        status: true,
    },
    {
        id:6,
        task: "Night Mode",
        status: true,
    },
    {
        id:7,
        task: "Delete task",
        status: false,
    },
]
states = [
    {
        id:0,
        state: "All",
        status: true,
    },
    {
        id:1,
        state: "Active",
        status: false,
    },
    {
        id:2,
        state: "Completed",
        status: false,
    },
]

let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;


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


function ClearCompleted(){
    tasks = tasks.filter((task)=>!task.status);
    for(let i=0; i<tasks.length;i++){
        tasks[i].id = i;
    }
    
    Reload(GetActiveStateId());
}
function GetActiveStateId(){
    let statedId =0;
    states.map((state)=>{
        if(state.status) stateId = state.id;
    })
    return stateId;
}
function Reload(statedId) {
    
    ClearLastTask();
    NewTask();
    LoadTasks(statedId);
    // 0 for all, 1 for active, 2 for completed

    AddDraggableListeners();
}

function LoadListFooter(){
    CalculateItemsLeft();
    if(width > 1000) LoadStateMenu();
    else LoadSeperateStateMenu();
    LoadActionsMenu();
}

function LoadSeperateStateMenu(){
    ClearLastSeperateStateMenu();
    states.map((state)=>{
        let li = document.createElement("li");
        li.className=`state-menu-item ${state.id}${state.status? " active":""}`
        li.id = `seperate-state-menu`
        li.innerHTML = state.state;
        li.addEventListener("click", ToggleState)
        mobileStateMenuElement.appendChild(li);
    })
}

function ClearLastSeperateStateMenu(){
    ClearTasks(mobileStateMenuElement);
}
function LoadActionsMenu(){

}

function LoadStateMenu(){
    states.map((state)=>{
        let li = document.createElement("li");
        li.className=`menu-item ${state.id}${state.status? " active":""}`
        li.innerHTML = state.state;
        li.addEventListener("click", ToggleState)
        stateMenuElement.appendChild(li);
    })
}

function ToggleState(e){
    let stateId = parseInt(e.target.classList[1]);
    states.map((state)=>{
        if(state.id === stateId) state.status = true;
        else state.status = false;
    })
    
    ClearTasks(stateMenuElement);
    if(width > 1000) LoadStateMenu();
    else LoadSeperateStateMenu();
    LoadTasks(stateId);
}

function GetTaskTextInputField() {
    return document.getElementById(`text-${tasks.length + 1}`);
}

function CalculateItemsLeft(){
    let total =0;
    tasks.map((task)=>{
        if(!task.status) total+=1;
    })
    itemsLeft.innerHTML = `${total} items left`
}

function ClearTasks(list){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}
function ToggleStatus(e){
    let taskId = parseInt(e.target.parentNode.classList[1]);
    tasks.map((task)=>{
        if(task.id === taskId) task.status= !task.status;
    })
    
    LoadTasks(GetActiveStateId());
}
function TasksLengthByState(){
    let state = GetActiveStateId();
    let length = 0;
    if(state===0) return tasks.length;
    else if(state === 1) state = false;
    else state = true;
    tasks.forEach((task)=>{
        if(task.status === state) length+=1;
    })
    return length;
}

function LoadTasks(statusState) {
    let status = statusState === 0 ? "All" : statusState === 1 ? "Active" : "Completed";

    if(status === "Active") statusState = false;
    else if(status === "Completed") statusState = true;
    ClearTasks(todoListElement);
    if(TasksLengthByState() ===0){
        let li = document.createElement("li");
        li.className = `todo-item`;

        li.innerHTML = `No tasks to show.`;
        todoListElement.appendChild(li);
        return;
    }
    tasks.map((task) => {
        if(statusState !== 0){
            if(task.status === statusState){
                CreateTaskElement(task);
            }
        }
        else{
            CreateTaskElement(task);
        }
    });
    
    CalculateItemsLeft();
}
function RemoveHidden(e){
    let task = e.target.childNodes[0];
    if(task) task.classList.remove('hidden')
}
function AddHidden(e){
    let task = e.target.childNodes[0];
    if(task) task.classList.add('hidden')
}
function CreateTaskElement(task) {
    let li = document.createElement("li");
    li.draggable = true;
    li.className = `todo-item ${task.id}`;
    li.id = `todo`;
    li.onclick = ToggleStatus;
    li.onmouseenter = AddDeleteTask;
    li.onmouseout = RemoveDeleteTask;
    // li.onmouseenter = RemoveHidden;
    // li.onmouseout = AddHidden;
    
    let button = document.createElement("button");
    button.innerHTML = `<img src="images\\icon-cross.svg"/>`
    button.className = 'btn delete-task hidden'
    button.onclick = DeleteTask;
    li.appendChild(button);
    let checkbox = document.createElement("input");
    
    if (task.status)
        checkbox.checked = true;
    checkbox.type = "checkbox";
    checkbox.className = "task-done";

    let text = document.createElement("p");
    text.innerHTML = " " + task.task;
    text.className = `todo-text ${task.status ? "done" : ""}`;

    li.appendChild(checkbox);
    li.appendChild(text);

    todoListElement.appendChild(li);
}
function DeleteTask(e){
    console.log("in");
    let taskId = e.target.classList[1];
    console.log(taskId);
}
function AddDeleteTask(e){
    if(e.target.classList.contains('todo-item')){
        let svg = document.createElement('img');
        svg.src = "images/icon-cross.svg";
        svg.id = `delete-${e.target.classList[1]}`;
        svg.className = "cross";
        
        let div = document.createElement("div");
        div.onclick =DeleteTask;
        div.id = `delete-div-${e.target.classList[1]}`;
        div.className = "delete-task";
        
        div.appendChild(svg);
        e.target.appendChild(div);
        AddDraggableListeners();
    }
}

function RemoveDeleteTask(e){
    if(e.target.classList.contains('todo-item')){
        let div = document.getElementById(`delete-div-${e.target.classList[1]}`);

        AddDraggableListeners()
        if(div) e.target.removeChild(div);
    }
}

function AddTask(e){
    let inputText;
    let newTaskData;
    const checkbox = document.getElementById(`checkbox-${tasks.length}`);
    
    if(e.keyCode === 13){
        inputText= e.target.value;

        newTaskData = {
            id: tasks.length,
            task: inputText,
            status: checkbox.checked,
        }

        tasks.push(newTaskData);
        Reload(GetActiveStateId());
    }
}
function ClearLastTask(){
    ClearTasks(newTaskUlElement);
}
function NewTask(){
    
    let li = document.createElement("li");
    li.className = `new-todo-item ${tasks.length}`;
    li.id = `new-todo-item ${tasks.length}`;
    let checkbox= document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${tasks.length}`;
    checkbox.className = "task-done";

    let text= document.createElement("input");
    text.type = "text";
    text.className = `new-task-input`;
    text.id = `text-${tasks.length}`;
    text.onsubmit=AddTask;

    text.addEventListener("keyup", AddTask);

    li.appendChild(checkbox);
    li.appendChild(text);
    newTaskUlElement.appendChild(li);
}

function AddDraggableListeners(){
    const tasksElementsArray = document.querySelectorAll(".todo-item");
    for(const task of tasksElementsArray){
        
        task.addEventListener('dragstart', DragStart);
        task.addEventListener('dragover', DragOver);
        task.addEventListener('dragenter', DragEnter);
        task.addEventListener('drop', DragDrop);
    }
}

let draggedTaskId = -1;
let dragOverTaskId = -1;

function DragStart(e){
    console.log("start");
    
    dragSrcEl = this;
    draggedTaskId = parseInt(this.className.substring(10));

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    console.log("dragged id::" +draggedTaskId);
}

function DragOver(e){
    e.preventDefault();
}

function DragEnter(e){
    e.preventDefault();
}

function DragDrop(e){
    e.stopPropagation();

    if (dragSrcEl !== this) {
        dragOverTaskId= parseInt(this.className.substring(10));
        console.log("dragged over::" + dragOverTaskId);
      }
      SwitchTasks(draggedTaskId, dragOverTaskId);
      return false;
}
function SwitchTasks(draggedTaskId,dragOverTaskId){
    tasks.forEach((task)=>{
        if(task.id == draggedTaskId) {
            task.id = dragOverTaskId;
        }
        else if (task.id == dragOverTaskId) {
            task.id = draggedTaskId;
        }

    })
    
    SortTasksById();
    
    Reload(GetActiveStateId());
    AddDraggableListeners();
}
function SortTasksById(){
    tasks = tasks.sort((a,b)=>{
        return a.id - b.id;
    })
}
AddDraggableListeners();

// suppose i get an array of tasks that got id, task and a status
let jsonTasks =[];

FetchRestAPI();

async function FetchRestAPI() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json()) // get the response
        .then(json=>JsonNewTask(json)) // proccess tasks
        .then(tasksArr => tasks.push(...[tasksArr])).then(()=>Reload(GetActiveStateId())) // push to tasks global array
        // I made the ...[] contradition to simulate that i got an array and expanded all of its components
    }

function JsonNewTask(json){
    /*
    IF IT WAS AN ARRAY OF OBJECTS THIS IS WHAT I WOULD USE
    */

    // let arr = []
    // console.log(json);
    // json.forEach((object)=>{
    //     let newTask = {
    //         id: json.id,
    //         task: json.title,
    //         status: json.completed,
    //     }
    //     arr.push(newTask);
    // });
    // return arr;

    let newTask = {
        id: tasks.length,
        task: json.title,
        status: json.completed,
    }
    return(newTask);
}

function SetNightMode(){
    const bg = document.getElementById("bg");
    bg.src = "images/bg-desktop-dark.jpg";

    const body = document.querySelector("body")
    body.style.backgroundColor = "hsl(235, 21%, 11%)";

    const containers = document.querySelectorAll(".container");
    containers.forEach((container)=>{
        container.style.backgroundColor = "hsl(235, 24%, 19%)";
    })

    const todo_items = document.querySelectorAll("#todo");
    todo_items.forEach((todo)=>{
        // todo.style.borderBottom = "0.1px solid hsl(234, 11%, 52%)";
    })

    if(width>1000){
        const seperateStateMenuMobile = document.getElementById("mobile-state-menu");
        seperateStateMenuMobile.style.backgroundColor = "hsl(235, 24%, 19%)";
    }
    
    const inputfield = document.querySelector(".new-task-input");
    inputfield.style.backgroundColor = "hsl(235, 24%, 19%)";

    const modeIcon = document.getElementById("mode-icon");
    modeIcon.onclick = SetDayMode;
    modeIcon.src = "images/icon-sun.svg"
    
    AddDraggableListeners();
}

function SetDayMode(){
    const bg = document.getElementById("bg");
    bg.src = "images/bg-desktop-light.jpg";

    const body = document.querySelector("body")
    body.style.backgroundColor = "white";

    const containers = document.querySelectorAll(".container");
    containers.forEach((container)=>{
        container.style.backgroundColor = "hsl(0, 0%, 98%)";
    })

    if(width>1000){
    const seperateStateMenuMobile = document.getElementById("mobile-state-menu");
    seperateStateMenuMobile.style.backgroundColor = "hsl(0, 0%, 98%)";
}

    const inputfield = document.querySelector(".new-task-input");
    inputfield.style.backgroundColor = "hsl(0, 0%, 98%)";
    
    
    const modeIcon = document.getElementById("mode-icon");
    modeIcon.onclick = SetNightMode;
    modeIcon.src = "images/icon-moon.svg"
    
    AddDraggableListeners();
}
const modeIcon = document.getElementById("mode-icon");
modeIcon.onclick = SetNightMode;
modeIcon.src = "images/icon-moon.svg"