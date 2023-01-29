
function editTask(taskId) {
    console.log('test');
    elementsToConvert = ['detail-view-task-title', 'detail-view-description'];
    convertTextToImputfield(elementsToConvert);

}


function convertTextToImputfield(elementsToConvert){ 
    for (i = 0; i<elementsToConvert.length; i++){
        element = document.getElementById(elementsToConvert[i]);
        element.innerHTML = '<input value="'+element.innerText+'">';
    }
}
