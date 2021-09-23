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

