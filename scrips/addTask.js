let tasks = [];
let task;
let contacts = [];
let options = false;
setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');

async function init() {
   await includeHTML();
   markActivePage('addTask');
   await downloadFromServer();
   tasks = backend.getItem('tasks') || [];
   contacts = backend.getItem('contacts') || [];
}


function getTitle() {
   let title = document.getElementById('tasktitle').value;
   return title;                                                // mit rerurn wird das Ergebnis zurückgegeben
}


/*function getContacts () {
    let contacts = document.getElementById('contacts').value;
    return contacts;
 }
*/


function getDueDate() {
   let dueDate = document.getElementById('dueDate').value;
   return dueDate;
}


function getCategorie() {
   let category = document.getElementById('category').value;
   return category;
}


function getPriority() {
   let priority = document.getElementById('priority').value;
   return priority;
}


function getDescription() {
   let description = document.getElementById('desc').value;
   return description;
}


function setID() {
   let index = tasks.length - 1;
   let id = tasks[index].id + 1;
   return id;
}


function setTask() {
   task = {
      id: setID(),
      category: getCategorie(),
      title: getTitle(),
      description: getDescription(),
      status: 'toDo',
      priority: getPriority(),
      dueDate: getDueDate(),
   }
}

async function addTask() {
   setTask();
   tasks.push(task);
   await backend.setItem('tasks', JSON.stringify(tasks));
   clearTaskForm();
   window.location.href = '/board.html';
}


function clearTaskForm() {
   document.getElementById('category').value = '';
   document.getElementById('title').innerHTML = '';
   document.getElementById('description').innerHTML = '';
   document.getElementById('priority').value = '';
   document.getElementById('dueDate').value = '';
   document.getElementById('contact').value = '';
}

function btnCategory() {
   let toggleOptions = options;
   if (!toggleOptions) {
      document.getElementById(`optionContainer`).classList.remove('d-none');
      options = true;
   } else {
      document.getElementById(`optionContainer`).classList.add('d-none');
      options = false;
   }
}

function optionNewCategory() {
   document.getElementById('category').classList.add('d-none-imp');
   document.getElementById('sales').classList.add('d-none-imp');
   document.getElementById('design').classList.add('d-none-imp');
   document.getElementById('backoffice').classList.add('d-none-imp');
   document.getElementById('marketing').classList.add('d-none-imp');
   document.getElementById('media').classList.add('d-none-imp');
   

}

function optionSales() {
   document.getElementById('category').classList.add('d-none-imp');
   document.getElementById('newCategory').classList.add('d-none-imp');
   document.getElementById('design').classList.add('d-none-imp');
   document.getElementById('backoffice').classList.add('d-none-imp');
   document.getElementById('marketing').classList.add('d-none-imp');
   document.getElementById('media').classList.add('d-none-imp');
}

function optionDesign() {
   document.getElementById('category').classList.add('d-none-imp');
   document.getElementById('sales').classList.add('d-none-imp');
   document.getElementById('newCategory').classList.add('d-none-imp');
   document.getElementById('backoffice').classList.add('d-none-imp');
   document.getElementById('marketing').classList.add('d-none-imp');
   document.getElementById('media').classList.add('d-none-imp');
}

function optionBackoffice() {
   document.getElementById('category').classList.add('d-none-imp');
   document.getElementById('sales').classList.add('d-none-imp');
   document.getElementById('newCategory').classList.add('d-none-imp');
   document.getElementById('design').classList.add('d-none-imp');
   document.getElementById('marketing').classList.add('d-none-imp');
   document.getElementById('media').classList.add('d-none-imp');
}

function optionMarketing() {
   document.getElementById('category').classList.add('d-none-imp');
   document.getElementById('sales').classList.add('d-none-imp');
   document.getElementById('newCategory').classList.add('d-none-imp');
   document.getElementById('backoffice').classList.add('d-none-imp');
   document.getElementById('design').classList.add('d-none-imp');
   document.getElementById('media').classList.add('d-none-imp');
}

function optionMedia() {
   document.getElementById('category').classList.add('d-none-imp');
   document.getElementById('sales').classList.add('d-none-imp');
   document.getElementById('newCategory').classList.add('d-none-imp');
   document.getElementById('backoffice').classList.add('d-none-imp');
   document.getElementById('marketing').classList.add('d-none-imp');
   document.getElementById('design').classList.add('d-none-imp');
}

function btnPriority1(el) {
   el.style.backgroundColor = "#FF3D00";
   document.getElementById('spanwhite1').style.color = "#FFFFFF";
   document.getElementById('imgWhiteHigh1').src = "../"
 }

 function btnPriority2(el) {
   el.style.backgroundColor = "#FFA800";
   document.getElementById('spanwhite2').style.color = "#FFFFFF";
   document.getElementById('imgWhiteHigh2').src = "../"
 }

 function btnPriority3(el) {
   el.style.backgroundColor = "#7AE229";
   document.getElementById('spanwhite3').style.color = "#FFFFFF";
   document.getElementById('imgWhiteHigh3').src = "../"
 }