function loadTaskCardHTML(taskId, i){
    return `<div onclick="showDetailContent(${taskId})" id="card-${tasks[taskId].id}" draggable="true" ondragstart="startDragging(${tasks[taskId].id})" onmousedown="showAllPlaceholderBorders('${tasks[taskId].status}')" onmouseup="hideAllPlaceholderBorders()" class="task-card pointer">
        <div class="category-tag ${tasks[taskId].category}">${tasks[taskId].category}</div>
        <h3 class="task-title">${tasks[taskId].title}</h3>
        <span class="task-description">${tasks[taskId].description}</span>
        <div class="pos-rel">
            <div class="assign">
                <div id="${tasks[taskId].status}${i}assignedContact-0" class="kontakt-circle marketing"></div>
                <div id="${tasks[taskId].status}${i}assignedContact-1" class="kontakt-circle media assign-sympol-1 d-none"></div>
                <div id="${tasks[taskId].status}${i}assignedContact-2" class="kontakt-circle backoffice assign-sympol-2 d-none"></div>
            </div>
            <img src="../img/priority-${tasks[taskId].priority}.svg" class="task-priority">
        </div>
    </div>`;
}

function loadSearchTaskCardHTML(taskId){
    return `<div onclick="showDetailContent(${taskId})" class="task-card pointer">
    <div class="category-tag ${tasks[taskId].category}">${tasks[taskId].category}</div>
    <h3 class="task-title">${tasks[taskId].title}</h3>
    <span class="task-description">${tasks[taskId].description}</span>
    <div class="pos-rel">
        <div class="assign">
            <div id="${tasks[taskId].status}${i}assignedContact-0" class="kontakt-circle marketing"></div>
            <div id="${tasks[taskId].status}${i}assignedContact-1" class="kontakt-circle media assign-sympol-1 d-none"></div>
            <div id="${tasks[taskId].status}${i}assignedContact-2" class="kontakt-circle backoffice assign-sympol-2 d-none"></div>
        </div>
        <img src="../img/priority-${tasks[taskId].priority}.svg" class="task-priority">
    </div>
    </div>`
}

function placeholderHTML(container){
    return `<div id= "${container}-empty" class = "empty-task-card"></div>`;
}

function createCategoryHTML(category){
    return `<div onclick="setCategory('${category}')" class="options" value="${category}">
    <span class="option-span">${category}</span>
    <div class="circle ${category}"></div>
    </div>`
}

function createCategoryHTMLForButton(category){
    return `
    <span class="option-span">${category}</span>
    <div class="circle ${category}"></div>
    `
}

function contactLabelHTML(name, i){
    return `
    <label class="contact-label">
       <span class="contact-name">${name}</span>
       <input  class="checkbox" type="checkbox" id="contact-${i}" value="yes">
    </label>
 `
 }

 
function subtaskHTML(subtask, i){
    return `
    <label class="subtask-label">
       <input class="checkbox" type="checkbox" id="subtask-${i}" value="yes">
       <span>${subtask}</span>
    </label>
    `
 }

 function newCategoryInputHTML(){
 return`
    <div class="select-Categorie">
       <input class="input-new-category" type="text" placeholder="New category name" id="new-cat-name" required>
       <div class="new-category-buttons">
          <div class="clear-color" onclick="returnToList(); renderCategoryList()">
             <img class="cancel-category" src="../img/cancel-blue.png">
          </div>
             <img class="tilde" src="../img/tilde.png">
          <div class="clear-color" onclick="addNewCategory()">
             <img class="cancel-category" src="../img/check-blue.png">
          </div>
       </div>
    `;
 }


 /* ---------------------------- Contacts ----------------------------------- */

 function generalContactPostHTML(i) {
    return`
    <div id="contact-${i}" class="contact-container contact-container-hover display-start" onclick="showContact(${i})">
        <span class="kontakt-circle" style="background-color:${contacts[i]['color']};">${contacts[i]['shortName']}</span>
        <div class="mail-name">
            <span>${contacts[i]['name']}</span>
            <span class="mail-adress">${contacts[i]['email']}</span>
        </div>
    </div>
`
}

function detailContactHTML(i) {
    return ` 
    <div class="contact-detail-topsection" id="detailContact">
        <div class="display-center margin-top kontakt-circle-big" style="background-color: ${contacts[i]['color']};">
                ${contacts[i]['shortName']}
        </div> 
        <div>
            <div class="contact-name-h2"><b>${contacts[i]['name']}</b></div> 
            <div class="add-task">
                <img src="../img/plus-blue.svg">
                <span onclick="addTaskContact()">Add Task</span>
            </div>
        </div>
    </div>
        <div>
            <div class="contact-view">
                <span><b>Contact Information</b></span>
                <button onclick="showEditContactHTML(${i})" class="edit-contact-btn">
                    <img class="pencil" src="../img/pencil-blue.svg">
                    <span>Edit Contact</span>
                </button>
            </div>
                <div class="margin-top"><b>Email</b></div>
                <div class="mail-adress">${contacts[i]['email']}</div>
                <div class="margin-top"><b>Mobile</b></div>
                <div> +${contacts[i]['mobil']}</div> 
        </div>`;
}
