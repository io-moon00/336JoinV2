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
  document.getElementById('optionContainer').classList.remove('d-none');
  renderCategories();
}

function optionNewCategory() {
   document.getElementById('category').classList.add('d-none-imp');
   document.getElementById('sales').classList.add('d-none-imp');
   document.getElementById('design').classList.add('d-none-imp');
   document.getElementById('backoffice').classList.add('d-none-imp');
   document.getElementById('marketing').classList.add('d-none-imp');
   document.getElementById('media').classList.add('d-none-imp');
}

function showCategory(category){
      document.getElementById('category').classList.remove('d-none'); // show Button
      document.getElementById('selected-category').innerHTML = createCategoryHTMLForButton(category); // set innerHMTL of Butron
      document.getElementById('optionContainer').classList.add('d-none'); // Verstecke option container
}

let categories = ['sales', 'design', 'backoffice', 'marketing', 'media'];

function renderCategories(){
   document.getElementById('optionContainer').innerHTML = `new`;// new Category div
   for(let i = 0; i < categories.length; i++){
      document.getElementById('optionContainer').innerHTML += createCategoryHTML(categories[i]);
   }
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

function renderContacts () {
   document.getElementById('contacts').innerHTML ='';
   for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      document.getElementById('contacts').innerHTML+= `<div>${contact.name} </div>`;
   }
}

function btnContacts() {
   document.getElementById('contacts').classList.remove('d-none-imp');
   renderContacts ();
}


