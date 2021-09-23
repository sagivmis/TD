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