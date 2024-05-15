var taskValue = document.getElementById("taskValue");
var list = document.getElementById("list");
var savedTasks =JSON.parse(localStorage.getItem("savedTasks"))||[];

function checkDone(task){
    task.addEventListener("click",function(){
        task.classList.toggle("done");
    })
}

function deleteTask(task){
    // creating deleting btn for every task
    let deleteBtn = document.createElement("span");
    deleteBtn.className = "deleteBtn";
    deleteBtn.innerHTML = "✕";
    task.appendChild(deleteBtn);
    // deleting task
    task.querySelector("span").addEventListener("click",function(){
        savedTasks = savedTasks.filter((saved) => saved != task.textContent.slice(0, -1));
        task.remove();
    })
 }



function newTask(){
    //creating new task element
    let task = document.createElement("li");
    if(taskValue.value ==""){
        window.alert("please write your new task");
    }else if (savedTasks.includes(taskValue.value)){
        window.alert("this task is already added");
    }else {  
        task.innerHTML= taskValue.value;
        savedTasks.push(taskValue.value);
        taskValue.value="";
        // checking task as done
        checkDone(task);
        // deleting task
        deleteTask(task);

        list.appendChild(task);}
}

function saveTasks(){
    localStorage.setItem("savedTasks",JSON.stringify(savedTasks))
}

function loadSavedTasks(){
    savedTasks.forEach(element => {
        let task = document.createElement("li");
        task.innerHTML= element;
        // checking task as done
        checkDone(task);
        // deleting task
        deleteTask(task);

        list.appendChild(task);
    })
        
    //clear localstorge after loading saved tasks
    localStorage.setItem("savedTasks","");
     localStorage.clear();  
}

// Initiall call to load saved tasks
document.addEventListener("DOMContentLoaded",loadSavedTasks)

