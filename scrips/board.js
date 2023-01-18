let currentDraggedTask;
let statOfCurrentDraggedTask;
let tasks = [];
let contacts = [];
marker = 0;
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
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    setAllTaskArrays();
    renderAllTasks();
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


function setAssignedTo(i, taskID, status){
    let numberOfContacts = tasks[taskID].assignedTo.length;
    let assignContacts = tasks[taskID].assignedTo;
    let basicID = status + i +'assignedContact-';
    console.log(numberOfContacts);
    switch (numberOfContacts){
        case 1:
            document.getElementById(basicID + 0).classList.remove('d-none');
            document.getElementById(basicID + 0).innerHTML = contacts[assignContacts[0]].shortName;
            break;
        case 2:
            for(let j = 0; j < 2; j++){
                removeDNone(basicID +j);
                setInnerHTMLContactsToAssign(basicID + j, contacts[assignContacts[j]].shortName);  
            }
            break;
        case 3:
            for(let j = 0; j < 3; j++){
                removeDNone(basicID + j);
                setInnerHTMLContactsToAssign(basicID + j, contacts[assignContacts[j]].shortName)  
            }
            break;
        default: 
        for(let j = 0; j < 3; j++){
            removeDNone(basicID + j);  
            if(j == 2){
                let contactRest = numberOfContacts-2;
                setInnerHTMLContactsToAssign(basicID + j,'+' + contactRest);
            }
            else{
                setInnerHTMLContactsToAssign(basicID + j, contacts[assignContacts[j]].shortName);
            }   
        }
        break;
    }
}

function removeDNone(id){
    document.getElementById(id).classList.remove('d-none');
}


function setInnerHTMLContactsToAssign(id, html){
    document.getElementById(id).innerHTML = html;
}


/**
 * The function iterates over the entire toDoTasks and displays a task card with the task parameters
 */
function renderToDoTasks(){
    for(let i = 0; i<toDoTasks.length; i++){
        document.getElementById('toDo-tasks').innerHTML += loadTaskCardHTML(toDoTasks[i], i);
        setAssignedTo(i, toDoTasks[i], 'toDo');
    }  
}


/**
 * The function iterates over the entire progressTasks and displays a task card with the task parameters
 */
function renderProgressTasks(){
    for(let i = 0; i<progressTasks.length; i++){
        document.getElementById('progress-tasks').innerHTML += loadTaskCardHTML(progressTasks[i], i);
        setAssignedTo(i, progressTasks[i], 'progress');
    }
    
}


/**
 * The function iterates over the entire feedbackTasks and displays a task card with the task parameters
 */
function renderFeedbackTasks(){
    for(let i = 0; i<feedbackTasks.length; i++){
        document.getElementById('feedback-tasks').innerHTML += loadTaskCardHTML(feedbackTasks[i], i);
        setAssignedTo(i, feedbackTasks[i], 'feedback');
    } 
}


/**
 * The function iterates over the entire doneTasks and displays a task card with the task parameters
 */
function renderDoneTasks(){
    for(let i = 0; i<doneTasks.length; i++){
        document.getElementById('done-tasks').innerHTML += loadTaskCardHTML(doneTasks[i], i);
        setAssignedTo(i, doneTasks[i], 'done');
    }
}


/**
 * The function adds a placeholder to each end of the status columns. This placeholders then can be highlighted on start dragging
 */
function addPlaceholder(){
    document.getElementById('toDo-tasks').innerHTML += placeholderHTML('toDo-tasks');
    document.getElementById('progress-tasks').innerHTML += placeholderHTML('progress-tasks');
    document.getElementById('feedback-tasks').innerHTML += placeholderHTML('feedback-tasks');
    document.getElementById('done-tasks').innerHTML += placeholderHTML('done-tasks');
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
    pushTaskToArray(status, currentDraggedTask); 
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
        hideAllPlaceholderBorders();
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


/**
 * This function displays the detail view container. It is executed on click on a task
 * @param {Integer} i -Task id in tasks array which will be shown in the detail view
 */
function showDetailContent(i){
    let task = tasks[i];
    setDetailViewInnerHTML(task);
    setDetailViewStyle(task);
    showPriorityOnDetailView(i);
}


/**
 * It sets and shows the title, the category and the priority of the task on the detail view container
 * @param {*} task -task is the task in the tasks array which is shown in the view container
 */
function setDetailViewInnerHTML(task){
    document.getElementById('detail-view-category').innerHTML = task.category;
    document.getElementById('detail-view-task-title').innerHTML = task.title;
    document.getElementById('detail-view-description').innerHTML = task.description;
}


function setDetailViewStyle(task){
    document.getElementById('task-details').classList.remove('d-none');
    document.getElementById('detail-view-category').classList.add('category-tag');
    document.getElementById('detail-view-category').classList.add(task.category);
    document.getElementById('task-container').classList.add('hide-content');
    document.getElementById('priority-tag-detail-view').classList.add('priority-tag-detail-view');
}


function closeDetailView(){
    document.getElementById('task-details').classList.add('d-none');
    document.getElementById('detail-view-category').className = ''; 
    document.getElementById('task-container').classList.remove('hide-content');
    document.getElementById('priority-tag-detail-view').className = '';
}


function showPriorityOnDetailView(i){
    let priority = tasks[i].priority;
    document.getElementById('priority-tag-detail-view').classList.add('bg-'+priority);
    if(priority === 'high'){
        document.getElementById('priority-detail-view').innerHTML = 'Urgent';
    }
    else{
        document.getElementById('priority-detail-view').innerHTML = priority;
    }
    document.getElementById('priority-detail-view-img').src = '../img/priority-'+priority+'.svg';
}

let searchTitle;
let searchDescription;
let searchInput = '';

function filterTasks() {
    
    searchInput = document.getElementById('search-input').value;
    search = search.toLowerCase();

    
    let length = tasks.length;

    for (i = 0; i < length; i++) {
        searchTitle = tasks[i]['title'].toLowerCase();
        searchDescription = tasks[i]['description'].toLowerCase();
        if (searchTitle.match(searchInput) == searchInput || searchDescription.match(searchInput) == searchInput) {
            filteredTasks.push(tasks[i]);
        }
    }
    renderAllTasks();
}