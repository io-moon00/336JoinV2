let currentDraggedTask;
let statOfCurrentDraggedTask;
let allToDoTasks = [];
let allInProgressTasks = [];
let allAwaitFeedbackTasks = [];
let allDoneTasks = [];

async function init(){
    await includeHTML();
    markActivePage('board');
    loadAllTasks();
}

function loadAllTasks(){
    
    for(let i = 0; i<tasks.length; i++){
        if(tasks[i].status == "to-do"){
            allToDoTasks.push(i);
        }
        if(tasks[i].status == "progress"){
            allInProgressTasks.push(i);
        }
        if(tasks[i].status == "feedback"){
            allAwaitFeedbackTasks.push(i);
        }
        if(tasks[i].status == "done"){
            allDoneTasks.push(i);
        }      
    }
    renderAllTasks();
    
}

function clearTaskBoard(){
    document.getElementById('to-do-tasks').innerHTML ='';
    document.getElementById('progress-tasks').innerHTML = '';
    document.getElementById('feedback-tasks').innerHTML ='';
    document.getElementById('done-tasks').innerHTML ='';
}

function renderAllTasks(){
    clearTaskBoard();
    renderToDoTasks();
    renderProgressTasks();
    renderFeedbackTasks();
    renderDoneTasks();
    addPlaceholder();
}


function renderToDoTasks(){
    for(let i = 0; i<allToDoTasks.length; i++){
        document.getElementById('to-do-tasks').innerHTML += loadTaskCardHTML(allToDoTasks[i]);
    }  
}

function renderProgressTasks(){
    for(let i = 0; i<allInProgressTasks.length; i++){
        document.getElementById('progress-tasks').innerHTML += loadTaskCardHTML(allInProgressTasks[i]);
    }
    
}

function renderFeedbackTasks(){
    for(let i = 0; i<allAwaitFeedbackTasks.length; i++){
        document.getElementById('feedback-tasks').innerHTML += loadTaskCardHTML(allAwaitFeedbackTasks[i]);
    } 
}

function renderDoneTasks(){
    for(let i = 0; i<allDoneTasks.length; i++){
        document.getElementById('done-tasks').innerHTML += loadTaskCardHTML(allDoneTasks[i]);
    }
}

function addPlaceholder(){
    document.getElementById('to-do-tasks').innerHTML += `<div id= "to-do-tasks-empty" class = "empty-task-card"></div>`;
    document.getElementById('progress-tasks').innerHTML += `<div id= "progress-tasks-empty" class = "empty-task-card"></div>`;
    document.getElementById('feedback-tasks').innerHTML += `<div id= "feedback-tasks-empty"  class = "empty-task-card"></div>`;
    document.getElementById('done-tasks').innerHTML += `<div id= "done-tasks-empty"  class = "empty-task-card"></div>`;
}


// Drag and Drop

function startDragging(taskId){
    currentDraggedTask = taskId;
}


function showAllPlaceholderBorders(status){
    statOfCurrentDraggedTask = status;
    let id = statOfCurrentDraggedTask +'-tasks-empty';
    document.getElementById(id).classList.add('d-none');
    document.getElementById('to-do-tasks-empty').classList.add('drag-area-border');
    document.getElementById('progress-tasks-empty').classList.add('drag-area-border');
    document.getElementById('feedback-tasks-empty').classList.add('drag-area-border');
    document.getElementById('done-tasks-empty').classList.add('drag-area-border');
}

function hideAllPlaceholderBorders(){
    let id = statOfCurrentDraggedTask +'-tasks-empty';
    document.getElementById(id).classList.remove('d-none');
    document.getElementById('to-do-tasks-empty').classList.remove('drag-area-border');
    document.getElementById('progress-tasks-empty').classList.remove('drag-area-border');
    document.getElementById('feedback-tasks-empty').classList.remove('drag-area-border');
    document.getElementById('done-tasks-empty').classList.remove('drag-area-border');
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status){

    let currentStatus = tasks[currentDraggedTask].status;
    if(status == "to-do"){
        allToDoTasks.push(currentDraggedTask);
    }
    if(status == "progress"){
        allInProgressTasks.push(currentDraggedTask);
    }
    if(status == "feedback"){
        allAwaitFeedbackTasks.push(currentDraggedTask);
    }
    if(status == "done"){
        allDoneTasks.push(currentDraggedTask);
    }  

    if(currentStatus == 'to-do'){
        let index = allToDoTasks.indexOf(currentDraggedTask);
        allToDoTasks.splice(index, 1);
        console.log('to-do'+index);
    }
    if(currentStatus == 'progress'){
        let index = allInProgressTasks.indexOf(currentDraggedTask);
        allInProgressTasks.splice(index, 1);
        console.log('progress'+index);
    }
    if(currentStatus == 'feedback'){
        let index = allAwaitFeedbackTasks.indexOf(currentDraggedTask);
        allAwaitFeedbackTasks.splice(index, 1);
        console.log('feedback'+index);
    }
    if(currentStatus == 'done'){
        let index = allDoneTasks.indexOf(currentDraggedTask);
        allDoneTasks.splice(index, 1);
        console.log('done'+index);
    }
    tasks[currentDraggedTask].status = status;
        

    renderAllTasks();
}

function highlight(id){
    let idOfDraggedElement = statOfCurrentDraggedTask +'-tasks-empty';
    if(id != idOfDraggedElement){
        hideAllPlaceholderBorders()
        document.getElementById(id).classList.add('drag-area-border');
    }
    
}

function removeHighlight(id){
    document.getElementById(id).classList.remove('drag-area-border');
}