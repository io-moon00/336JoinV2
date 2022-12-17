function loadTaskCardHTML(i){
    return `<div onclick="showDetailContent(${i})" id="card-${tasks[i].id}" draggable="true" ondragstart="startDragging(${tasks[i].id})" onmousedown="showAllPlaceholderBorders('${tasks[i].status}')" onmouseup="hideAllPlaceholderBorders()" class="task-card pointer">
        <div class="category-tag ${tasks[i].category}">${tasks[i].category}</div>
        <h3 class="task-title">${tasks[i].title}</h3>
        <span class="task-description">${tasks[i].description}</span>
        <div class="progress flex">
            <div class="progress-bar"></div>
            <span class="progress-text">1/2 Done</span>
        </div>
        <div class="pos-rel">
            <div class="assign">
                <div id="colorName" class="kontakt-circle marketing"  >${tasks[i].shortName[0]}</div>
                <div class="kontakt-circle media assign-sympol-1">${tasks[i].shortName[1]}</div>
                <div class="kontakt-circle backoffice assign-sympol-2">${tasks[i].shortName[2]}</div>
            </div>
            <img src="../img/priority-${tasks[i].priority}.svg" class="task-priority">
        </div>
    </div>`;
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
       <input class="checkbox" type="checkbox" id="contact-${i}" value="yes">
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