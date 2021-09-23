function ClearCompleted(){
    tasks = tasks.filter((task)=>!task.status);
    for(let i=0; i<tasks.length;i++){
        tasks[i].id = i;
    }
    
    Reload(GetActiveStateId());
}



function ClearTasks(list){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

function LoadTasks(statusState) {
    let status = statusState === 0 ? "All" : statusState === 1 ? "Active" : "Completed";

    CalculateItemsLeft();
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
    
}
function CreateTaskElement(task) {
    let li = document.createElement("li");
    li.draggable = true;
    li.className = `todo-item ${task.id}`;
    li.id = `todo`;
    li.onclick = ToggleStatus;
    // li.onmouseenter = AddDeleteTask;
    // li.onmouseout = RemoveDeleteTask;
    li.onmouseenter = RemoveHidden;
    // li.onmouseout = AddHidden;
    
    let button = document.createElement("button");
    button.innerHTML = `<img src="images\\icon-cross.svg"/>`
    button.className = 'btn delete-task hidden'
    button.onclick = DeleteTask;
    button.onmouseover = RemoveHidden;
    button.onmouseout = AddHidden;
    // button.id = ``
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
    // console.log("in");
    let taskId = parseInt(e.target.parentNode.parentNode.classList[1]);
    tasks = tasks.filter((task)=>task.id!==taskId);
    Reload(GetActiveStateId());
    console.log(tasks);
}
function ClearLastTask(){
    ClearTasks(newTaskUlElement);
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

