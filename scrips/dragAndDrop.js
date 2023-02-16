function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * the function is executed at dragging start and assigns the id of the element to be moved to the variable <currentDraggedTask>
 * @param {integer} taskId  -this is the id of the dragged element
 */
function startDragging(taskId){
    currentDraggedTask = taskId;
}


/**
 * the function pushes the dragge task to the dropped area and removes it from the status current array.
 * Then sets the status of the task to the new status
 * @param {string} status -is the new status of the task. It is determined by the location where the task was dropped
 */
function moveTo(status){
    pushTaskToArray(status, currentDraggedTask); 
    removeTaskFromArray();
    saveNewStatus(currentDraggedTask, status)
    renderAllTasks();
}


/**
 * highlight the placholder where the element can be dropped.
 * it is executed on dragover of an element
 * @param {integer} id - id of the dragged over element
 */
function highlight(id){
    let idOfDraggedElement = statOfCurrentDraggedTask +'-tasks-empty';
    if(id != idOfDraggedElement){
        hideAllPlaceholderBorders();
        document.getElementById(id).classList.add('drag-area-border');
    }
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
 * removes the highlight of the placholder.
 * it is executed on ondragleave of an element
 * @param {integer} id -id of the ondragleaved element
 */
function removeHighlight(id){
    document.getElementById(id).classList.remove('drag-area-border');
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



async function saveNewStatus(taskId, newStatus){
    tasks[taskId].status= newStatus;
    await backend.setItem('tasks', JSON.stringify(tasks));
}