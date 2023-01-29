
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

function detailContentHTML(task){
   return `    
    <div id="task-details" class="task-details">
        <img onclick="closeDetailView()" class="close-cross" src="/img/close-cross.svg" alt="close cross">
        <div id="detail-view-category" class="${task.category} category-tag">${task.category}</div>
        <h2 id="detail-view-task-title">${task.title}</h2>
        <div id="detail-view-description">${task.description}</div>
        <div class="date-detail-view">
            <span class="font-weight-700 font-family-inter">Due date:</span>
            <span>${task.duDate}</span>
        </div>
        <div class="priority-container-detail-view">
            <span class="font-weight-700 font-family-inter">Priority:</span>
            <div id="priority-tag-detail-view" class="priority-tag-detail-view">
                <span id="priority-detail-view" class="priority-detail-view"></span>
                <img id="priority-detail-view-img" src="" alt="priority icon">
            </div>
        </div>
        <div>
            <span class="font-weight-700 font-family-inter">Assigned To:</span>
            <div class="flex-wrap" id="assigned-contacts"></div>
        </div>
        <div  class="edit-icon" id="edit-task-icon" onclick = "editTask(${task.id})">
            <svg width="21" height="31" viewBox="0 0 21 31" fill="none">
                <path d="M2.94497 22.5156L7.7643 25.4405L20.4075 4.60842C20.694 4.13628 20.5436 3.52125 20.0714 3.23471L16.9618 1.34748C16.4897 1.06094 15.8747 1.21139 15.5881 1.68353L2.94497 22.5156Z" fill="white"/>
                <path d="M2.3599 23.4794L7.17923 26.4043L2.45061 28.6892L2.3599 23.4794Z" fill="white"/>
            </svg>
        </div>
    </div>`
}


function renderDetailContacts(taskID){
    let assignContacts = tasks[taskID].assignedTo;
    document.getElementById('assigned-contacts').innerHTML = '';
    for(i = 0; i<assignContacts.length; i++){
        document.getElementById('assigned-contacts').innerHTML += `
        <div class ="kontakt-circle-div" >
            <div class ="kontakt-circle color${i}">
            ${contacts[assignContacts[i]].shortName}</div>
            <div class="assigned-contacts-name">${contacts[assignContacts[i]].name}</div>
        </div>
 `
    }
}


function closeDetailView(){
    document.getElementById('detailView').classList.add('d-none');
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