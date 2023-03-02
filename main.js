//setting variables
let input = document.querySelector(".input")
let theSubmit = document.querySelector(".add")
let tasksDiv  = document.querySelector(".tasks ")


//create empty array
let arrayOfTasks = []
// if(localStorage.getItem("tasks")){
// arrayOfTasks = JSON.parse(localStorage.getItem("items"))
// }
getDataFromLocalStorage()
theSubmit.onclick = function () {
    if(input.value !== ""){
        addTaskToArray(input.value) //add Task yo Array Of Tasks
        input.value = ""  //empty input field
    }
}

//Click on Task Element
tasksDiv.addEventListener("click",(e)=>{
    //Delete Button
    if(e.target.classList.contains("del")){
        //Delete Element from Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        //Delete Element from Page
        e.target.parentElement.remove()
        //toggle done task element
    }
    if(e.target.classList.contains("task")){
        //toggle function
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        //toggle class done
        e.target.classList.toggle("done")
    }
})
function addTaskToArray(taskText){
const task = {
    id : Date.now(),
    title : taskText,
    completed : false
}
// push task into array
arrayOfTasks.push(task)
//add tasks to array
addElementToPageFrom(arrayOfTasks)
//add tasks to local storage
addDataToLocalStorageFrom(arrayOfTasks)
}

//add element to page function
function addElementToPageFrom(arrayOfTasks){
    //Empty the tasks div
    tasksDiv.innerHTML="";

    //looping on array of tasks
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div")
        div.className="task"
        if(task.completed){
            div.className="task done"
        }
        div.setAttribute("data-id",task.id)
        div.appendChild(document.createTextNode(task.title))

        //craete delete button
        let span = document.createElement("span")
        span.className="del"
        span.appendChild(document.createTextNode("Delete"))
        //append delete btn to div
        div.appendChild(span)
        //add task div to main div container
        tasksDiv.appendChild(div)
    });
}

function addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks")
    if(data){
        let tasks = JSON.parse(data)
        addElementToPageFrom(tasks)
    }
}


function deleteTaskWith(taskId){
arrayOfTasks = arrayOfTasks.filter((task)=> task.id != taskId);
addDataToLocalStorageFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){
    for(let i=0;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true ): (arrayOfTasks[i].completed=false)

        }
    }
    addDataToLocalStorageFrom(arrayOfTasks)

}