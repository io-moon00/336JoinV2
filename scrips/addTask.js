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


let selectedContacts = [];
function getContacts() {
   for (let i = 0; i < contacts.length; i++) {
      let contact = document.getElementById('contact-' + i);
      if (contact.checked == true) {
         selectedContacts.push(contacts[i].name);
      }
   }
   return selectedContacts;
}



let assignedTo = [];
function getAssignedContacts() {
   for (let i = 0; i < contacts.length; i++) {
      let contact = document.getElementById('contact-' + i);
      if (contact.checked == true) {
         assignedTo.push(i);
      }
   }
   return assignedTo;
}


let selectedNameColor = [];
function getNameColor() {
   for (let i = 0; i < contacts.length; i++) {
      let contact = document.getElementById('contact-' + i);
      if (contact.checked == true) {
         selectedNameColor.push(contacts[i].color);
      }
   }
   return selectedNameColor;
}


function getSubtasks() {
   let selectedSubtasks = [];
   for (let i = 0; i < subtasks.length; i++) {
      let subtask = document.getElementById('subtask-' + i);
      if (subtask.checked == true) {
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
   let description = document.getElementById('desc').value;
   return description;
}


function setID() {
   let id;
   if(tasks.length < 1){
      id = 0;
   }
   else{
      let index = tasks.length - 1;
      id = tasks[index].id + 1;
   }
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
      contactCard: getContacts(),
      assignedTo: getAssignedContacts(),
      nameColor: getNameColor(),
   }
}




async function addTask() {
   if (checkingEmptyValues() == true) {
      setTask();
      tasks.push(task);
      showAnim();
      await backend.setItem('tasks', JSON.stringify(tasks));

      window.location.href = '/pages/board.html';
   }
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
   if (categoriesVisible) {
      document.getElementById('category-container').innerHTML = '';
      categoriesVisible = false;
   }
   else {
      renderCategories();
      categoriesVisible = true;
   }
}


function setCategory(selectedCategory) {
   category = selectedCategory;
   document.getElementById('selected-category').innerHTML = createCategoryHTMLForButton(selectedCategory);
   document.getElementById('selected-category').classList.add('capitalize');
   document.getElementById('category-container').innerHTML = '';
   categoriesVisible = false;
}


let categories = ['sales', 'design', 'backoffice', 'marketing', 'media'];


function renderCategories() {
   document.getElementById('category-container').innerHTML = '';
   document.getElementById('category-container').innerHTML = `<div onclick="createCategory()" class="options"><span class="option-span">new category</span></div>`;
   for (let i = 0; i < categories.length; i++) {
      document.getElementById('category-container').innerHTML += createCategoryHTML(categories[i]);
   }
}


let contactVisible;
function assignContacts() {
   if (contactVisible) {
      document.getElementById('contacts').innerHTML = '';
      contactVisible = false;
   }
   else {
      renderContacts();
      contactVisible = true;
   }
}



function renderContacts() {
   document.getElementById('contacts').innerHTML = '';
   for (let i = 0; i < contacts.length; i++) {
      console.log();
      document.getElementById('contacts').innerHTML += contactLabelHTML(contacts[i].name, i);
      
   }
}


let subtasks = ['Subtask 1', 'Subtask 2'];
function renderSubtasks() {
   document.getElementById('subtasks').innerHTML = '';
   for (let i = 0; i < subtasks.length; i++) {
      document.getElementById('subtasks').innerHTML += subtaskHTML(subtasks[i], i);
   }
}


function addSubtask() {
   let newSubtask = document.getElementById('subtask-input').value;
   subtasks.push(newSubtask);
   document.getElementById('subtask-input').value = '';
   renderSubtasks();
}


function setPriority(selectedPriority) {
   priority = selectedPriority;

   document.getElementById('high').classList.remove('high');
   document.getElementById('medium').classList.remove('medium');
   document.getElementById('low').classList.remove('low');

   document.getElementById(priority).classList.add(priority);
}

/**
 * the function checking are die values ampt or not
 * @returns
 */
function checkingEmptyValues() {
   if (document.getElementById("task-title").value == false) {
      document.getElementById('input-alert').innerHTML = `This field is required!`;
      return false;
   }
   if (document.getElementById("due-date").value == false) {
      document.getElementById('date-alert').innerHTML = `Please select a date!`;
      return false;
   }
   if (document.getElementById("desc").value == false) {
      document.getElementById('desc-alert').innerHTML = `Please give it a description!`;
      return false;
   }
   else {
      return true;
   }
}

/**
 * the function animate add to board
 * @returns
 */

function showAnim() {
   document.getElementById('add-to-board').style = `transform: translateY(0vh);`;
   setTimeout(function () { hideAnim() }, 1000);
}


function hideAnim() {
   document.getElementById('add-to-board').style = `transform: translateY(100vh);`;
}

/**
 * Clear the input / selectors
 */
function taskClear() {
   document.getElementById("task-title").value = ``;
   document.getElementById("due-date").value = ``;
   document.getElementById("desc").value = ``;
   document.getElementById("subtask-input").value = ``;
   assignContacts();
   selectCategory();
   window.location.reload();
}

function createCategory() {
   newCategoryInput();
   newCategoryColors();
   renderCatColors();
}

function newCategoryInput() {
   let selectedContainer = document.getElementById('category');
   selectedContainer.innerHTML = '';
   selectedContainer.innerHTML += newCategoryInputHTML();
}

function newCategoryColors() {
   let categoryContainer = document.getElementById('category-container');
   categoryContainer.innerHTML = '';
   categoryContainer.innerHTML += `
<div class="choose-color" id="cat-colors">
</div>`;
}


let colors = ["8AA4FF", "FF0000", "2AD300", "FF7A00", "E200BE", "0038FF"];

function renderCatColors() {
   let colorbar = document.getElementById('cat-colors');
   let ID = -1;

   for (let i = 0; i < colors.length; i++) {
      const color = colors[i];
      ID++;
      colorbar.innerHTML += `<div id="color${ID}" class="category-color" style="background: #${color}" onclick="addColor('${color}')"></div>`;
   }
}

function validate(category) {
   if (categoryToTask.length <= 0) {
     categoryToTask.push(category);
     resetList(category);
   } else {
     categoryToTask = [];
     categoryToTask.push(category);
     resetList(category);
   }
 }

 function addColor(value) {
  let newCatNameColor = document.getElementById('new-cat-name');
      newCatNameColor.value = '';
      newCatNameColor.value += `<div class="category-color" style="background: #${value}"></div>`;

 }




