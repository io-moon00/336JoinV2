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
                <div class="kontakt-circle marketing">SM</div>
                <div class="kontakt-circle media assign-sympol-1">MV</div>
                <div class="kontakt-circle backoffice assign-sympol-2">EF</div>
            </div>
            <img src="../img/priority-${tasks[i].priority}.svg" class="task-priority">
        </div>
    </div>`;
}

function placeholderHTML(container){
    return `<div id= "${container}-empty" class = "empty-task-card"></div>`;
}

function createCategoryHTML(category){
    return `<div onclick="showCategory('${category}')" class="options" value="${category}">
    <span class="option-span">${category}</span>
    <div class="circle"><img src="../img/circle-${category}.svg"></div>
    </div>`
}

function createCategoryHTMLForButton(category){
    return `
    <span class="option-span">${category}</span>
    <div class="circle"><img src="../img/circle-${category}.svg"></div>`
}



