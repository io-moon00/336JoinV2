let tasks = [];
let task;
let contacts = [];
let options = false;
setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');

async function init(){
    await includeHTML();
    markActivePage('addTask');
    await downloadFromServer();
    tasks = backend.getItem('tasks') || [];
    contacts = backend.getItem('contacts') || [];
}


function getTitle () {
   let title = document.getElementById('tasktitle').value;  
   return title;                                                // mit rerurn wird das Ergebnis zurückgegeben
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


 function setTask(){
        task = {
        id: setID(),
        category: getCategorie(),
        title: getTitle(),
        description: getDescription(),
        status: 'toDo',
        priority: getPriority (),
        dueDate: getDueDate(),
    } 
 }

  async function addTask () {
   setTask();
   tasks.push(task);
   await backend.setItem('tasks', JSON.stringify(tasks));
   clearTaskForm ();
   window.location.href = '/board.html';
}


function clearTaskForm () {
    document.getElementById('category').value = '';
    document.getElementById('title').innerHTML = '';
    document.getElementById('description').innerHTML = '';
    document.getElementById('priority').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('contact').value = '';
}

function btnCategory(){
   let toggleOptions = options;
   if (!toggleOptions) {
       document.getElementById(`optionContainer`).classList.remove('d-none');
       options = true;
   } else {
       document.getElementById(`optionContainer`).classList.add('d-none');
       options = false;
   }
}



/*function optionSales() {
   let commentInput = document.getElementById('category');
   commentInput.innerHTML += document.getElementById('sales');
}*/



 






