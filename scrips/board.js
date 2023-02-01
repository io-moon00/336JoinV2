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
 * The function clears the board. All tasks will be removed so they can be rendered after
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
    switch (numberOfContacts){
        case 1:
            showOneCircle(basicID, assignContacts);
            break;
        case 2:
            showTwoCircles(basicID, assignContacts);
            break;
        case 3:
            shwoThreeCircles(basicID, assignContacts);
            break;
        default: 
        showThreeCirclesAndCalcRest(basicID, assignContacts, numberOfContacts);
        break;
    }
}


function removeDNone(id, assignContacts){
    document.getElementById(id).classList.remove('d-none');
}


function setContactCircleBg(id, assignContacts){
    document.getElementById(id).style.background = assignContacts.color;
}


function setInnerHTMLContactsToAssign(id, html){
    document.getElementById(id).innerHTML = html;
}


function showOneCircle(basicID, assignContacts){
    document.getElementById(basicID + 0).classList.remove('d-none');
    document.getElementById(basicID + 0).style.background = contacts[assignContacts[0]].color;
    document.getElementById(basicID + 0).innerHTML = contacts[assignContacts[0]].shortName;
}


function showTwoCircles(basicID, assignContacts){
    for(let j = 0; j < 2; j++){
        removeDNone(basicID +j);
        setContactCircleBg(basicID + j, contacts[assignContacts[j]]),
        setInnerHTMLContactsToAssign(basicID + j, contacts[assignContacts[j]].shortName);  
    }
}


function shwoThreeCircles(basicID, assignContacts){
    for(let j = 0; j < 3; j++){
        removeDNone(basicID + j);
        setInnerHTMLContactsToAssign(basicID + j, contacts[assignContacts[j]].shortName);
        setContactCircleBg(basicID + j, contacts[assignContacts[j]]);
    }
}


function showThreeCirclesAndCalcRest(basicID, assignContacts, numberOfContacts){
    for(let j = 0; j < 3; j++){
        removeDNone(basicID + j);  
        if(j == 2){
            let contactRest = numberOfContacts-2;
            setInnerHTMLContactsToAssign(basicID + j,'+' + contactRest);
        }
        else{
            setInnerHTMLContactsToAssign(basicID + j, contacts[assignContacts[j]].shortName);
            setContactCircleBg(basicID + j, contacts[assignContacts[j]]);
        }   
    }
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

// filter -------------------------------------------------------------------------------------------

let searchDescription;
let searchInput = '';
let search;
let filteredTasks = [];

function filterTasks() {
    searchInput = document.getElementById('search-input').value;
    search = searchInput.toLowerCase();
    console.log(search);
    if (searchInput == ''){
        renderAllTasks();
    }
    else{ 
        clearTaskBoard();
        for (i = 0; i < tasks.length; i++) {  
        let searchTask = tasks[i]['title'].toLowerCase();
        if (searchTask.includes(search)) {
            let status = tasks[i].status;
            let taskId = tasks[i].id;
            elementId = status + '-tasks';
            document.getElementById(elementId).innerHTML = loadSearchTaskCardHTML(taskId);
            setAssignedTo(i, taskID, status);
        }
    }
    console.log(filteredTasks);
    }
}