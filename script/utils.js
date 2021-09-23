function SortTasksById(){
    tasks = tasks.sort((a,b)=>{
        return a.id - b.id;
    })
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
function ToggleStatus(e){
    let taskId = parseInt(e.target.parentNode.classList[1]);
    tasks.map((task)=>{
        if(task.id === taskId) task.status= !task.status;
    })
    
    LoadTasks(GetActiveStateId());
}
function CalculateItemsLeft(){
    let total =0;
    tasks.map((task)=>{
        if(!task.status) total+=1;
    })
    itemsLeft.innerHTML = `${total} items left`
}

function GetTaskTextInputField() {
    return document.getElementById(`text-${tasks.length + 1}`);
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
function LoadStateMenu(){
    states.map((state)=>{
        let li = document.createElement("li");
        li.className=`menu-item ${state.id}${state.status? " active":""}`
        li.innerHTML = state.state;
        li.addEventListener("click", ToggleState)
        stateMenuElement.appendChild(li);
    })
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
function GetActiveStateId(){
    let stateId =0;
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

function AddHidden(e){
    let task = e.target.childNodes[0];
    if(task) if(task.classList) if(task.classList.contains('delete-task')) task.classList.add('hidden')
}



function RemoveHidden(e){
    let task = e.target.childNodes[0];
    if(task) task.classList.remove('hidden')
    setTimeout(()=>AddHidden(e), 1000);
}