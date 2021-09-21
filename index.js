tasks=[
    {
        id:1,
        task: "Complete online Javascript course",
        status: false,
    },
    
    {
        id:2,
        task: "Jog around the park 3x",
        status: false,
    },
    {
        id:3,
        task: "10 minutes meditation",
        status: false,
    },
    {
        id:4,
        task: "Eat",
        status: false,
    },
    {
        id:5,
        task: "Study for exam",
        status: true,
    },
]

const todoListElement = document.getElementById("todo");
const itemsLeft = document.getElementById("items-left");
const newTaskUlElement = document.getElementById("new-task");


LoadTasks();
NewTask();

let newTodo = document.getElementById(`new-todo-item ${tasks.length+1}`)
let newTaskTextInputField = GetTaskTextInputField();

// AddTextListener();

function GetTaskTextInputField() {
    return document.getElementById(`text-${tasks.length + 1}`);
}

function AddTextListener() {
    newTaskTextInputField.addEventListener("keyup", AddTask);
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
    
    LoadTasks();
}

function LoadTasks() {
    ClearTasks(todoListElement);
    if(tasks.length ===0){
        let tag = document.createElement("li");
        tag.className = `todo-item`;

        tag.innerHTML = `No tasks to show.`;
        todoListElement.appendChild(tag);
        return;
    }
    tasks.map((task) => {
        let tag = document.createElement("li");
        tag.className = `todo-item ${task.id}`;
        tag.onclick = ToggleStatus;
        let checkbox = document.createElement("input");
        if(task.status)checkbox.checked=true;
        checkbox.type = "checkbox";
        checkbox.className = "task-done";

        let text= document.createTextNode(" " + task.task);
        text= document.createElement("p");
        text.innerHTML=" " + task.task;
        text.className = `todo-text ${task.status? "done":""}`;

        tag.appendChild(checkbox);
        tag.appendChild(text);
        
        todoListElement.appendChild(tag);
    });
}
function AddTask(e){
    let inputText;
    let newTaskData;
    const checkbox = document.getElementById(`checkbox-${tasks.length+1}`);
    if(e.keyCode === 13){
        inputText= e.target.value;

        newTaskData = {
            id: tasks.length+1,
            task: inputText,
            status: checkbox.checked,
        }
        tasks.push(newTaskData);
        LoadTasks();
        ClearLastTask();
        NewTask();
    }
}
function ClearLastTask(){
    ClearTasks(newTaskUlElement);
}
function NewTask(){
    
    let tag = document.createElement("li");
    tag.className = `new-todo-item ${tasks.length+1}`;
    tag.id = `new-todo-item ${tasks.length+1}`;
    let checkbox= document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${tasks.length+1}`;
    checkbox.className = "task-done";

    let text= document.createElement("input");
    text.type = "text";
    text.className = `new-task-input`;
    text.id = `text-${tasks.length+1}`;
    text.onsubmit=AddTask;

    text.addEventListener("keyup", AddTask);

    tag.appendChild(checkbox);
    tag.appendChild(text);
    newTaskUlElement.appendChild(tag);
}