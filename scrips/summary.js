let currentDate;
let userName;
setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');

async function initSummary(){
    await includeHTML();
    markActivePage('summary');
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
    showUserName();
    setDate();
    setAllTaskArrays();
    setAllTaskNummbersOnSummaryBoard();
}


function setDate(){
    currentDate = new Date();
    console.log(currentDate);
    var day = String(currentDate.getDate()).padStart(2, '0');
    var month = currentDate.toLocaleString('default', { month: 'long' });
    var year = currentDate.getFullYear();
    document.getElementById('date').innerHTML = `${month} ${day}, ${year}`;
}

function getArray(key){ 
    return JSON.parse(localStorage.getItem(key));
}


function showUserName(){
    userName = getArray('userName');
    document.getElementById('user-name').innerHTML = userName;
}


function setAllTaskNummbersOnSummaryBoard(){
    document.getElementById('tasks-to-do-summary').innerHTML = toDoTasks.length;
    document.getElementById('tasks-summary').innerHTML = tasks.length;
    document.getElementById('task-in-progress-summary').innerHTML = progressTasks.length;
    document.getElementById('task-awaiting-feedback-summary').innerHTML = feedbackTasks.length;
    document.getElementById('task-done-summary').innerHTML = doneTasks.length;
}
