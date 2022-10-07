let tasks = [];


async function init(){
    await includeHTML();
    markActivePage('addTask');
}


function getTitle () {
   let title = document.getElementById('tasktitle').value;
   return title; 
}


/*function getContacts () {
    let contacts = document.getElementById('contacts').value;
    return contacts;
 }
*/


function getDueDate () {
    let dueDate = document.getElementById('dueDate').value;
    return dueDate;
 }


function getCategorie () {
    let category = document.getElementById('category').value;
    return category;
 }


 function getPriority () {
    let priority = document.getElementById('priority').value;
    return priority;
 }


 function getDescription () {
    let description = document.getElementById('desc').value;
    return description;
 }

 function setID () {
    let index = tasks.length -1;
    let id = tasks[index].id +1;
    return id;
 }

 function addTask () {
    let task = {
        id: setID(),
        category: getCategorie(),
        title: getTitle(),
        description: getDescription(),
        status: 'toDo',
        priority: getPriority (),
        dueDate: getDueDate(),
    }
    
    tasks.push(task);
    clearTaskForm ();
    window.open('../pages/board.html');
}

async function getTasks (){
    let url = '/tasks.json';
    try {
        let response = await fetch(url);
        tasks = await response.json();
    } catch (error) {
        console.log(error);
    }
 }


function clearTaskForm () {
    document.getElementById('category').value = '';
    document.getElementById('title').innerHTML = '';
    document.getElementById('description').innerHTML = '';
    document.getElementById('priority').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('contact').value = '';
}





 






