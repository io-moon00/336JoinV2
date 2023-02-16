
/**
 * This function displays the detail view container. It is executed on click on a task
 * @param {Integer} i -Task id in tasks array which will be shown in the detail view
 */
function showDetailContent(i){
    let task = tasks[i];
    document.getElementById('detailView').classList.remove('d-none');
    document.getElementById('detailView').innerHTML = detailContentHTML(task);
    renderDetailContacts(task.id);
    showPriorityOnDetailView(i);
}


function renderDetailContacts(taskID){
    let assignContacts = tasks[taskID].assignedTo;
    document.getElementById('assigned-contacts').innerHTML = '';
    for(i = 0; i<assignContacts.length; i++){
        document.getElementById('assigned-contacts').innerHTML += `
        <div class ="kontakt-circle-div" >
            <div class ="kontakt-circle" style = "background-color: ${contacts[assignContacts[i]].color}">
            ${contacts[assignContacts[i]].shortName}</div>
            <div class="assigned-contacts-name">${contacts[assignContacts[i]].name}</div>
        </div>`
    }
}


function closeDetailView(){
    document.getElementById('detailView').classList.add('d-none');
    resetEditParameter();
}


function showPriorityOnDetailView(i){
    let priority = tasks[i].priority;
    document.getElementById('priority-tag-detail-view').classList.add('bg-'+priority);
    if(priority === 'high'){
        document.getElementById('priority-detail-view').innerHTML = 'Urgent';
    }
    else{
        document.getElementById('priority-detail-view').innerHTML = priority;
    }
    document.getElementById('priority-detail-view-img').src = '../img/priority-'+priority+'.svg';
}