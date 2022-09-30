let currentDraggedTask;



function loadAllTasks(){
    clearTaskBoard();
    for(let i = 0; i<tasks.length; i++){
        if(tasks[i].status == "to-do"){
            renderToDoTasks(i);
        }
        if(tasks[i].status == "progress"){
            renderProgressTasks(i);
        }
        if(tasks[i].status == "feedback"){
            renderFeedbackTasks(i);
        }
        if(tasks[i].status == "done"){
            renderDoneTasks(i);
        }      
    }
    addEmptyCard();
}

function clearTaskBoard(){
    document.getElementById('to-do-tasks').innerHTML ='';
    document.getElementById('progress-tasks').innerHTML = '';
    document.getElementById('feedback-tasks').innerHTML ='';
    document.getElementById('done-tasks').innerHTML ='';
}


function renderToDoTasks(i){
    document.getElementById('to-do-tasks').innerHTML += loadTaskCardHTML(i);
}

function renderProgressTasks(i){
    document.getElementById('progress-tasks').innerHTML += loadTaskCardHTML(i);
}

function renderFeedbackTasks(i){
    document.getElementById('feedback-tasks').innerHTML += loadTaskCardHTML(i);
}

function renderDoneTasks(i){
    document.getElementById('done-tasks').innerHTML += loadTaskCardHTML(i);
}

function startDragging(taskId){
    currentDraggedTask = taskId;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status){
    tasks[currentDraggedTask].status = status;
    loadAllTasks();
}

function addEmptyCard(){
    document.getElementById('to-do-tasks').innerHTML += `<div style = "width: 250px; height: 220px"></div>`;
    document.getElementById('progress-tasks').innerHTML += `<div style = "width: 250px; height: 220px"></div>`;
    document.getElementById('feedback-tasks').innerHTML += `<div style = "width: 250px; height: 220px"></div>`;
    document.getElementById('done-tasks').innerHTML += `<div style = "width: 250px; height: 220px"></div>`;
}