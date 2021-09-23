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

function AddDraggableListeners(){
    const tasksElementsArray = document.querySelectorAll(".todo-item");
    for(const task of tasksElementsArray){
        
        task.addEventListener('dragstart', DragStart);
        task.addEventListener('dragover', DragOver);
        task.addEventListener('dragenter', DragEnter);
        task.addEventListener('drop', DragDrop);
    }
}