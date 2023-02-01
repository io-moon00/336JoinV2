function editTask(taskId) {
    showInputFields();
    hideContentNotToEdit();
    setInputFieldText(taskId);
    renderCircles(taskId);
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
}


function hideContentNotToEdit(){
    document.getElementById('detail-view-task-title').classList.add('d-none');
    document.getElementById('detail-view-description').classList.add('d-none');
    document.getElementById('detail-view-date').classList.add('d-none');
    document.getElementById('priority-container-detail-view').classList.add('d-none');
    document.getElementById('edit-task-icon').classList.add('d-none');
    document.getElementById('assigned-contacts-detail-view').classList.add('d-none');
}


function renderCircles(taskID){
    document.getElementById('contact-circles').innerHTML = '';
    let assignedContacts = tasks[taskID].assignedTo;
    for(i = 0; i<assignedContacts.length; i++){
            document.getElementById('contact-circles').innerHTML += `
            <div class="kontakt-circle" style="background-color: ${contacts[assignedContacts[i]].color}">${contacts[assignedContacts[i]].shortName}</div>
            `
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
