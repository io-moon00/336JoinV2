let currentDate;
let userName;
let tasks = [];
setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');

async function init(){
    await includeHTML();
    markActivePage('summary');
    await downloadFromServer();
    tasks = backend.getItem('tasks') || [];
    showUserName();
    setDate();
    setTaskInBoard()
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


function setTaskInBoard(){
    document.getElementById('tasks-to-do-summary').innerHTML = tasks.length;
}
