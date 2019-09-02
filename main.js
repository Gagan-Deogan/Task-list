const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#task");


loadEventListners();

function loadEventListners(){
    // get tasks
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addtask);
    //remove task
    taskList.addEventListener('click', removeTask);
    // clear all task
    clearBtn.addEventListener('click', clearTask );
    // filter to tasks
    filter.addEventListener('keyup', filterTasks );
    
}
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
    const li = document.createElement('li');
    // adding class
    li.className = 'collection-item';
    // create text node
    li.appendChild(document.createTextNode(task));
    // create link to delete items
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // create icon
    const icon = document.createElement('i');
    icon.className = 'fa fa-remove';

    link.appendChild(icon);
    li.appendChild(link);
    taskList.appendChild(li);
    })
    e.preventDefault();
}

function addtask(e){
    if(taskInput.value ===""){
        alert("add a task");
    }
    // create list items
    const li = document.createElement('li');
    // adding class
    li.className = 'collection-item';
    // create text node
    li.appendChild(document.createTextNode(taskInput.value));
    // create link to delete items
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // create icon
    const icon = document.createElement('i');
    icon.className = 'fa fa-remove';

    link.appendChild(icon);
    li.appendChild(link);
    taskList.appendChild(li);

    // storage 
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}




function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('are you sure')){
            e.target.parentElement.parentElement.remove();

            localRemoveTask(e.target.parentElement.parentElement)
        }
    }
}
function localRemoveTask(taskItem){
    const item = taskItem;
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1)
        }
    });
    localStorage.setItem("tasks",JSON.stringify(tasks));
    

}
function clearTask(e){
    // if(confirm("do you really want to clear all tasks")){
    //     taskList.innerHTML="";
    // }
    // faster way
    if(confirm("do you really want to clear all tasks")){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }
    clearLocalStorage()
e.preventDefault();
}
function clearLocalStorage(){
    localStorage.clear();
}
function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const items = task.firstChild.textContent;
            if(items.toLowerCase().indexOf(text) != -1){
                task.style.display="block";
            }else{
                task.style.display ="none"
            }
        }
    )
    
}