
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


/**
 * 
 * @param {*} task 
 * @returns 
 */
function detailContentHTML(task){
   return `    
    <div id="task-details" class="task-details">
        <img onclick="closeDetailView()" class="close-cross" src="/img/close-cross.svg" alt="close cross">
        <div id="detail-view-category" class="${task.category} category-tag">${task.category}</div>
        
        <!-------------Title---------------------------->
        <h2 class="" id="detail-view-task-title">${task.title}</h2>
        <div id="edit-title" class = "d-none ">
            <input id="edit-title-text" class="edit-title">
        </div>

        <!-------------Description---------------------------->
        <div class="" id="detail-view-description">${task.description}</div>
        <div id="edit-description" class = "d-none edit-description">
            <span>Description</span>
            <textarea id="edit-description-text"></textarea>
        </div>

        <!-------------Date---------------------------->
        <div id="detail-view-date" class="date-detail-view">
            <span class="font-weight-700 font-family-inter">Due date:</span>
            <span>${task.duDate}</span>
        </div>

        <!-------------Date Edit---------------------------->
        <div id="edit-date" class="d-none">
            <span>Due Date</span>
            <input class="date-input" id="due-date" type="date" placeholder="dd/mm/yyyy"></input>
        </div>

        <!-------------Priority---------------------------->
        <div id="priority-container-detail-view" class="priority-container-detail-view">
            <span class="font-weight-700 font-family-inter">Priority:</span>
            <div id="priority-tag-detail-view" class="priority-tag-detail-view">
                <span id="priority-detail-view" class="priority-detail-view"></span>
                <img id="priority-detail-view-img" src="" alt="priority icon">
            </div>
        </div>

        <!-------------Priority Edit---------------------------->
  
        <div class="priority d-none" id="edit-priority">
            <button id="high" class="btn-priority red" onclick="setPriority('high')">
                <span>Urgent</span>
                <svg id="img-low" class="high-img" width="18" height="13" viewBox="0 0 18 13" fill="none">
                    <path
                        d="M9.00026 5.25488C9.19969 5.25455 9.39397 5.31645 9.55451 5.43149L17.123 10.8655C17.2215 10.9362 17.3046 11.0251 17.3678 11.1272C17.4309 11.2292 17.4727 11.3423 17.4909 11.46C17.5276 11.6978 17.4656 11.94 17.3186 12.1334C17.1716 12.3267 16.9516 12.4554 16.7071 12.4911C16.4625 12.5267 16.2134 12.4665 16.0145 12.3236L9.00026 7.29262L1.98602 12.3236C1.88754 12.3943 1.7757 12.4455 1.65687 12.4743C1.53803 12.503 1.41455 12.5087 1.29345 12.4911C1.17235 12.4734 1.05602 12.4327 0.951088 12.3714C0.846159 12.31 0.754691 12.2291 0.681906 12.1334C0.609122 12.0376 0.556445 11.9289 0.526885 11.8134C0.497325 11.6978 0.491459 11.5778 0.509623 11.46C0.527789 11.3423 0.569626 11.2292 0.632752 11.1272C0.695876 11.0251 0.779049 10.9362 0.877524 10.8654L8.44602 5.43149C8.60656 5.31645 8.80083 5.25455 9.00026 5.25488Z"
                        fill="#FF3D00" />
                    <path
                        d="M9.00002 0.500001C9.19945 0.499667 9.39372 0.56157 9.55427 0.676604L17.1228 6.11057C17.3216 6.25348 17.454 6.46736 17.4907 6.70514C17.5273 6.94292 17.4654 7.18513 17.3184 7.37849C17.1714 7.57185 16.9514 7.70051 16.7068 7.73618C16.4623 7.77185 16.2131 7.7116 16.0143 7.56868L9.00002 2.53774L1.98577 7.56868C1.78689 7.7116 1.53777 7.77185 1.2932 7.73618C1.04863 7.70051 0.828657 7.57185 0.681662 7.37849C0.534667 7.18513 0.472695 6.94292 0.509379 6.70514C0.546065 6.46736 0.678402 6.25348 0.87728 6.11057L8.44577 0.676604C8.60631 0.561569 8.80059 0.499667 9.00002 0.500001Z"
                        fill="#FF3D00" />
                </svg>
            </button>

            <button id="medium" class="btn-priority orange" onclick="setPriority('medium')">
                <span>Medium</span>
                <svg width="18" height="7" viewBox="0 0 18 7" fill="none">
                    <path
                        d="M16.5685 6.6667L1.43151 6.6667C1.18446 6.6667 0.947523 6.56785 0.772832 6.39189C0.598141 6.21593 0.5 5.97728 0.5 5.72843C0.5 5.47959 0.598141 5.24093 0.772832 5.06497C0.947523 4.88901 1.18446 4.79016 1.43151 4.79016L16.5685 4.79016C16.8155 4.79016 17.0525 4.88901 17.2272 5.06497C17.4019 5.24093 17.5 5.47959 17.5 5.72843C17.5 5.97728 17.4019 6.21593 17.2272 6.39189C17.0525 6.56785 16.8155 6.6667 16.5685 6.6667Z"
                        fill="#FFA800" />
                    <path
                        d="M16.5685 2.20992L1.43151 2.20992C1.18446 2.20992 0.947523 2.11106 0.772832 1.9351C0.598141 1.75914 0.5 1.52049 0.5 1.27165C0.5 1.0228 0.598141 0.784147 0.772832 0.608187C0.947523 0.432227 1.18446 0.333374 1.43151 0.333374L16.5685 0.333374C16.8155 0.333374 17.0525 0.432227 17.2272 0.608187C17.4019 0.784147 17.5 1.0228 17.5 1.27165C17.5 1.52049 17.4019 1.75914 17.2272 1.9351C17.0525 2.11106 16.8155 2.20992 16.5685 2.20992Z"
                        fill="#FFA800" />
                </svg>
            </button>

            <button id="low" class="btn-priority green" onclick="setPriority('low')">
                <span>Low</span>
                <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
                    <path
                        d="M8.99974 7.74512C8.80031 7.74545 8.60603 7.68355 8.44549 7.56851L0.876998 2.13455C0.778524 2.06378 0.695351 1.97485 0.632227 1.87284C0.569103 1.77082 0.527264 1.65771 0.5091 1.53998C0.472414 1.3022 0.534386 1.05998 0.681381 0.866625C0.828377 0.673268 1.04835 0.544603 1.29292 0.508935C1.53749 0.473268 1.78661 0.53352 1.98549 0.676437L8.99974 5.70738L16.014 0.676438C16.1125 0.605672 16.2243 0.554458 16.3431 0.525718C16.462 0.496978 16.5855 0.491276 16.7066 0.508936C16.8277 0.526597 16.944 0.567275 17.0489 0.628647C17.1538 0.69002 17.2453 0.770885 17.3181 0.866626C17.3909 0.962367 17.4436 1.07111 17.4731 1.18664C17.5027 1.30218 17.5085 1.42224 17.4904 1.53998C17.4722 1.65772 17.4304 1.77082 17.3672 1.87284C17.3041 1.97486 17.221 2.06379 17.1225 2.13455L9.55398 7.56851C9.39344 7.68355 9.19917 7.74545 8.99974 7.74512Z"
                        fill="#7AE229" />
                    <path
                        d="M8.99998 12.5C8.80055 12.5003 8.60628 12.4384 8.44574 12.3234L0.877242 6.88943C0.678366 6.74652 0.546029 6.53264 0.509344 6.29486C0.472658 6.05708 0.53463 5.81487 0.681625 5.62151C0.828621 5.42815 1.0486 5.29949 1.29317 5.26382C1.53773 5.22815 1.78686 5.2884 1.98574 5.43132L8.99998 10.4623L16.0142 5.43132C16.2131 5.2884 16.4622 5.22815 16.7068 5.26382C16.9514 5.29949 17.1713 5.42815 17.3183 5.62151C17.4653 5.81487 17.5273 6.05708 17.4906 6.29486C17.4539 6.53264 17.3216 6.74652 17.1227 6.88943L9.55423 12.3234C9.39369 12.4384 9.19941 12.5003 8.99998 12.5Z"
                        fill="#7AE229" />
                </svg>
            </button>
        </div>

        <!-------------Assigned contacts---------------------------->
        <div id="assigned-contacts-detail-view">
            <span class="font-weight-700 font-family-inter">Assigned To:</span>
            <div class="flex-wrap" id="assigned-contacts"></div>
        </div>

        <!-------------Assigned contacts Edit---------------------------->
        <div id="edit-assigned-contacts" class="select d-none" onclick="assignContacts()">
            <div>Select contacts to assign</div>
                <img src="/img/drop-down-icon.svg" alt="drop down icon">
            </div>
            <div id="contacts" class="contacts">
            <div id="contact-circles"></div>
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
            <div class ="kontakt-circle" style = "background-color: ${contacts[assignContacts[i]].color}">
            ${contacts[assignContacts[i]].shortName}</div>
            <div class="assigned-contacts-name">${contacts[assignContacts[i]].name}</div>
        </div>`
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