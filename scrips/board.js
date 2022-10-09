let currentDraggedTask;
let statOfCurrentDraggedTask;
let toDoTasks = [];
let progressTasks = [];
let feedbackTasks = [];
let doneTasks = [];
let tasks = [];
setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');

/**
 * The function inits the board page. First the header and the sidebar will be included.
 * Then the current page will be marked with a background color
 * At least each task array will be filled dependet on the status of each task and rendered
 */
async function init(){
    await includeHTML();
    markActivePage('board');
    await downloadFromServer();
    tasks = backend.getItem('tasks') || [];
    setAllTaskArrays();
    renderAllTasks();
}


/**
 * The function iterates over the entire task array. According to the status of the task it will be added to the corresponding array.
 */
function setAllTaskArrays(){
    for(let i = 0; i<tasks.length; i++){
        let status = tasks[i].status;
        pushTaskToArray(status, i);
    }
}


/**
 * the function adds the taskid to the array depending on its status
 * @param {string} status -status of the task
 * @param {integer} taskId -id of the task
 */
function pushTaskToArray(status, taskId){
    if(status == 'toDo'){
        toDoTasks.push(taskId);
    }
    if(status == 'progress'){
        progressTasks.push(taskId);
    }
    if(status == 'feedback'){
        feedbackTasks.push(taskId);
    }
    if(status == 'done'){
        doneTasks.push(taskId);
    }   
}


/**
 * The function clears the board. All tasks will be removed
 */
function clearTaskBoard(){
    document.getElementById('toDo-tasks').innerHTML ='';
    document.getElementById('progress-tasks').innerHTML = '';
    document.getElementById('feedback-tasks').innerHTML ='';
    document.getElementById('done-tasks').innerHTML ='';
}


/**
 * first clears the taskboard and then renders all task status colomn.
 */
function renderAllTasks(){
    clearTaskBoard();
    renderToDoTasks();
    renderProgressTasks();
    renderFeedbackTasks();
    renderDoneTasks();
    addPlaceholder();
}


/**
 * The function iterates over the entire toDoTasks and displays a task card with the task parameters
 */
function renderToDoTasks(){
    for(let i = 0; i<toDoTasks.length; i++){
        document.getElementById('toDo-tasks').innerHTML += loadTaskCardHTML(toDoTasks[i]);
    }  
}


/**
 * The function iterates over the entire progressTasks and displays a task card with the task parameters
 */
function renderProgressTasks(){
    for(let i = 0; i<progressTasks.length; i++){
        document.getElementById('progress-tasks').innerHTML += loadTaskCardHTML(progressTasks[i]);
    }
    
}


/**
 * The function iterates over the entire feedbackTasks and displays a task card with the task parameters
 */
function renderFeedbackTasks(){
    for(let i = 0; i<feedbackTasks.length; i++){
        document.getElementById('feedback-tasks').innerHTML += loadTaskCardHTML(feedbackTasks[i]);
    } 
}


/**
 * The function iterates over the entire doneTasks and displays a task card with the task parameters
 */
function renderDoneTasks(){
    for(let i = 0; i<doneTasks.length; i++){
        document.getElementById('done-tasks').innerHTML += loadTaskCardHTML(doneTasks[i]);
    }
}


/**
 * The function adds a placeholder to each end of the status columns. This placeholders then can be highlighted on start dragging
 */
function addPlaceholder(){
    document.getElementById('toDo-tasks').innerHTML += `<div id= "toDo-tasks-empty" class = "empty-task-card"></div>`;
    document.getElementById('progress-tasks').innerHTML += `<div id= "progress-tasks-empty" class = "empty-task-card"></div>`;
    document.getElementById('feedback-tasks').innerHTML += `<div id= "feedback-tasks-empty"  class = "empty-task-card"></div>`;
    document.getElementById('done-tasks').innerHTML += `<div id= "done-tasks-empty"  class = "empty-task-card"></div>`;
}


// Drag and Drop


/**
 * the function is executed at dragging start and assigns the id of the element to be moved to the variable <currentDraggedTask>
 * @param {integer} taskId  -this is the id of the dragged element
 */
function startDragging(taskId){
    currentDraggedTask = taskId;
}


/**
 * the function marks all placeholders with a dashed line. Based on the current status of the element this column is not marked
 * the function is executed at onmousedown
 * @param {string} status -status is the current status of the dragged element and says which column should not be marked
 */
function showAllPlaceholderBorders(status){
    statOfCurrentDraggedTask = status;
    let id = statOfCurrentDraggedTask +'-tasks-empty';
    document.getElementById(id).classList.add('d-none');
    document.getElementById('toDo-tasks-empty').classList.add('drag-area-border');
    document.getElementById('progress-tasks-empty').classList.add('drag-area-border');
    document.getElementById('feedback-tasks-empty').classList.add('drag-area-border');
    document.getElementById('done-tasks-empty').classList.add('drag-area-border');
}


/**
 * all placeholders get unhighlighted
 */
function hideAllPlaceholderBorders(){
    let id = statOfCurrentDraggedTask +'-tasks-empty';
    document.getElementById(id).classList.remove('d-none');
    document.getElementById('toDo-tasks-empty').classList.remove('drag-area-border');
    document.getElementById('progress-tasks-empty').classList.remove('drag-area-border');
    document.getElementById('feedback-tasks-empty').classList.remove('drag-area-border');
    document.getElementById('done-tasks-empty').classList.remove('drag-area-border');
}


function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * the function pushes the dragge task to the dropped area and removes it from the status current array.
 * Then sets the status of the task to the new status
 * @param {string} status -is the new status of the task. It is determined by the location where the task was dropped
 */
function moveTo(status){
    pushTaskToArray(status, currentDraggedTask) 
    removeTaskFromArray();
    tasks[currentDraggedTask].status = status;
    renderAllTasks();
}


/**
 * The function removes the dropped task from the old array
 */
function removeTaskFromArray(){
    let currentStatus = tasks[currentDraggedTask].status;
    if(currentStatus == 'toDo'){
        let index = toDoTasks.indexOf(currentDraggedTask);
        toDoTasks.splice(index, 1);
    }
    if(currentStatus == 'progress'){
        let index = progressTasks.indexOf(currentDraggedTask);
        progressTasks.splice(index, 1);
    }
    if(currentStatus == 'feedback'){
        let index = feedbackTasks.indexOf(currentDraggedTask);
        feedbackTasks.splice(index, 1);
    }
    if(currentStatus == 'done'){
        let index = doneTasks.indexOf(currentDraggedTask);
        doneTasks.splice(index, 1);
    }
}


/**
 * highlight the placholder where the element can be dropped.
 * it is executed on dragover of an element
 * @param {integer} id - id of the dragged over element
 */
function highlight(id){
    let idOfDraggedElement = statOfCurrentDraggedTask +'-tasks-empty';
    if(id != idOfDraggedElement){
        hideAllPlaceholderBorders()
        document.getElementById(id).classList.add('drag-area-border');
    }
    
}


/**
 * removes the highlight of the placholder.
 * it is executed on ondragleave of an element
 * @param {integer} id -id of the ondragleaved element
 */
function removeHighlight(id){
    document.getElementById(id).classList.remove('drag-area-border');
}