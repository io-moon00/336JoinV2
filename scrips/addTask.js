let tasks = [];
let task;
let contacts = [];
let category;
let priority;
setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');

async function init() {
   await includeHTML();
   markActivePage('addTask');
   await downloadFromServer();
   tasks = JSON.parse(backend.getItem('tasks')) || [];
   contacts = JSON.parse(backend.getItem('contacts')) || [];
   renderSubtasks();
}

/**
 * the function returns the entered title
 * @returns
 */
function getTitle() {
   let title = document.getElementById('task-title').value;
   return title;                                               
}

function getContacts () {
   let selectedContacts = [];
   for(let i = 0; i<contacts.length; i++){
      let contact = document.getElementById('contact-' + i);
      if(contact.checked == true){
         selectedContacts.push(contacts[i].name);
      }
   }
   return selectedContacts;
}

function getSubtasks(){
   let selectedSubtasks = [];
   for(let i = 0; i<subtasks.length; i++){
      let subtask = document.getElementById('subtask-' + i);
      if(subtask.checked == true){
         selectedSubtasks.push(subtasks[i]);
      }
   }
   return selectedSubtasks;
}

function getDueDate() {
   let dueDate = document.getElementById('due-date').value;
   return dueDate;
}

function getDescription() {
   let description = document.getElementById('description').value;
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
      category: category,
      title: getTitle(),
      description: getDescription(),
      status: 'toDo',
      priority: priority,
      dueDate: getDueDate(),
   }
}


async function addTask() {
   setTask();
   tasks.push(task);
   await backend.setItem('tasks', JSON.stringify(tasks));
   window.location.href = '/pages/board.html';
}


function clearTaskForm() {
   document.getElementById('category').value = '';
   document.getElementById('title').innerHTML = '';
   document.getElementById('description').innerHTML = '';
   document.getElementById('priority').value = '';
   document.getElementById('dueDate').value = '';
   document.getElementById('contact').value = '';
}


let categoriesVisible = true;
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


function setCategory(selectedCategory){
   category = selectedCategory;
   document.getElementById('selected-category').innerHTML = createCategoryHTMLForButton(selectedCategory);
   document.getElementById('selected-category').classList.add('capitalize');
   document.getElementById('category-container').innerHTML = '';
   categoriesVisible = false;
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
      document.getElementById('contacts').innerHTML += contactLabelHTML(contacts[i].name, i);
   } 
}


let subtasks = ['Subtask 1', 'Subtask 2'];
function renderSubtasks(){
   document.getElementById('subtasks').innerHTML = '';
   for(let i = 0; i<subtasks.length; i ++){
      document.getElementById('subtasks').innerHTML += subtaskHTML(subtasks[i], i);
   }
}


function addSubtask(){
   let newSubtask = document.getElementById('subtask-input').value;
   subtasks.push(newSubtask);
   document.getElementById('subtask-input').value = '';
   renderSubtasks();
}


function setPriority(selectedPriority){
   priority = selectedPriority;

   document.getElementById('high').classList.remove('high');
   document.getElementById('medium').classList.remove('medium');
   document.getElementById('low').classList.remove('low');

   document.getElementById(priority).classList.add(priority);
}