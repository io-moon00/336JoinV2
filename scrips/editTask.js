let priority;
let title;
let description; 
let dueDate;


function editTask(taskId) {
    showInputFields();
    hideContentNotToEdit();
    setInputFieldText(taskId);
    renderCircles(taskId);
    priority = tasks[taskId].priority;
    markCurrentPriority(priority);
}


function showInputFields(){
    document.getElementById('edit-title').classList.remove('d-none');
    document.getElementById('edit-description').classList.remove('d-none');
    document.getElementById('edit-date').classList.remove('d-none');
    document.getElementById('edit-priority').classList.remove('d-none');
    document.getElementById('edit-assigned-contacts').classList.remove('d-none');
}


function setInputFieldText(taskId){
    document.getElementById('edit-title-text').value = tasks[taskId].title;
    document.getElementById('edit-description-text').value = tasks[taskId].description;
    document.getElementById('edit-due-date').value = tasks[taskId].dueDate;
}


function hideContentNotToEdit(){
    document.getElementById('detail-view-task-title').classList.add('d-none');
    document.getElementById('detail-view-description').classList.add('d-none');
    document.getElementById('detail-view-date').classList.add('d-none');
    document.getElementById('priority-container-detail-view').classList.add('d-none');
    document.getElementById('edit-task-icon').classList.add('d-none');
    document.getElementById('assigned-contacts-detail-view').classList.add('d-none');
    document.getElementById('save-btn').classList.remove('d-none');
    document.getElementById('detail-view-category').classList.add('d-none');
}


function renderCircles(taskID){
    document.getElementById('contact-circles').innerHTML = '';
    let assignedContacts = tasks[taskID].assignedTo;
    for(i = 0; i<assignedContacts.length; i++){
            document.getElementById('contact-circles').innerHTML +=`
            <div class="kontakt-circle" style="background-color: ${contacts[assignedContacts[i]].color}">${contacts[assignedContacts[i]].shortName}</div>
            `
    }
}


let contactVisible = false;
let editedContacts = false;
async function assignContacts(taskId) {
   editedContacts = true;
   if (contactVisible) {
      tasks[taskId].assignedTo = getAssignedContacts();
      document.getElementById('contacts').innerHTML = '';
      contactVisible = false;
      document.getElementById('contact-circles').classList.remove('d-none');
      renderCircles(taskId);
   }
   else {
      renderContacts(taskId);
      contactVisible = true;
      document.getElementById('contact-circles').classList.add('d-none');
   }
}


function setPriority(selectedPriority) {
    priority = selectedPriority;
    markCurrentPriority(priority);
 }


function renderContacts(taskId) {
    document.getElementById('contacts').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
       console.log();
       document.getElementById('contacts').innerHTML += contactLabelHTML(contacts[i].name, i);
    }
    markAssignedToContacts(taskId);
 }

 async function updateEditTask(taskId){
    getNewContent();
    tasks[taskId].title = title;
    tasks[taskId].description = description;
    tasks[taskId].dueDate = dueDate;
    tasks[taskId].priority = priority;
    if(editedContacts){
      tasks[taskId].assignedTo = getAssignedContacts(); 
    }
    await backend.setItem('tasks', JSON.stringify(tasks));
    resetEditParameter();
    closeDetailView();
    renderAllTasks();
 }


 function getNewContent(){
    title = document.getElementById('edit-title-text').value;
    description = document.getElementById('edit-description-text').value;
    dueDate = document.getElementById('edit-due-date').value;
 }

 function markCurrentPriority(priority){ 
    document.getElementById('high').classList.remove('high');
    document.getElementById('medium').classList.remove('medium');
    document.getElementById('low').classList.remove('low');
    document.getElementById(priority).classList.add(priority);
 }

 function resetEditParameter(){
    priority = '';
    title = '';
    description = '';
    dueDate = '';
    assignedTo = [];
    contactVisible = false;
    editedContacts = false;
 }

let assignedTo = [];
function getAssignedContacts() {
   assignedTo = [];
   try {
      for (let i = 0; i < contacts.length; i++) {
         let contact = document.getElementById('contact-' + i);
         if (contact.checked == true) {
            assignedTo.push(i);
         } 
      }
      return assignedTo;
   
   } 
   catch (error) {
      return [];
   }
}

function markAssignedToContacts(taskId){
    assignedTo = tasks[taskId].assignedTo;
    for(let i = 0; i< assignedTo.length; i++){
        document.getElementById('contact-' + assignedTo[i]).checked = true;
    }
}