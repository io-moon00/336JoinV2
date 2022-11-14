let tasks = [];
let task;
let contacts = [];
setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');

async function init() {
   await includeHTML();
   markActivePage('addTask');
   await downloadFromServer();
   tasks = backend.getItem('tasks') || [];
   contacts = JSON.parse(backend.getItem('contacts')) || [];
   renderSubtasks();
}

/**
 * the function returns the entered title
 * @returns
 */
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

let categoriesVisible;
function selectCategory() {
   if(categoriesVisible){
      document.getElementById('category-container').innerHTML = '';
      categoriesVisible = false;
   }
   else{
      renderCategories();
      categoriesVisible = true;
   }
}

function showCategory(category){
   document.getElementById('selected-category').innerHTML = createCategoryHTMLForButton(category);
   document.getElementById('selected-category').classList.add('capitalize');
   document.getElementById('category-container').innerHTML = '';
}

let categories = ['sales', 'design', 'backoffice', 'marketing', 'media'];

function renderCategories(){
   document.getElementById('category-container').innerHTML = '';
   document.getElementById('category-container').innerHTML = `<div onclick="createCategory()" class="options"><span class="option-span">new category</span></div>`;
   for(let i = 0; i < categories.length; i++){
      document.getElementById('category-container').innerHTML += createCategoryHTML(categories[i]);
   }
}


let contactVisible;
function assignContacts(){
   if(contactVisible){
      document.getElementById('contacts').innerHTML = '';
      contactVisible = false;
   }
   else{
      renderContacts();
      contactVisible = true;
   }
}

function renderContacts(){
   document.getElementById('contacts').innerHTML = '';
   for (let i = 0; i< contacts.length; i++){
      console.log();
      document.getElementById('contacts').innerHTML += contactLabelHTML(contacts[i].name);
   } 
}


let subtasks = ['Subtask 1', 'Subtask 2'];
function renderSubtasks(){
   document.getElementById('subtasks').innerHTML = '';
   for(let i = 0; i<subtasks.length; i ++){
      document.getElementById('subtasks').innerHTML += subtaskHTML(subtasks[i]);
   }
}


function addSubtask(){
   let newSubtask = document.getElementById('subtask-input').value;
   subtasks.push(newSubtask);
   document.getElementById('subtask-input').value = '';
   renderSubtasks();
}