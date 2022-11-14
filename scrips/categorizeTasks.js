let toDoTasks = [];
let progressTasks = [];
let feedbackTasks = [];
let doneTasks = [];

/**
 * The function iterates over the entire task array. According to the status of the task it will be added to the corresponding array.
 */
 function setAllTaskArrays(){
    for(let i = 0; i<tasks.length; i++){
        let status = tasks[i].status;
        pushTaskToArray(status, i);
    }
}


/**
 * the function adds the taskid to the array depending on its status
 * @param {string} status -status of the task
 * @param {integer} taskId -id of the task
 */
 function pushTaskToArray(status, taskId){
    if(status == 'toDo'){
        toDoTasks.push(taskId);
    }
    if(status == 'progress'){
        progressTasks.push(taskId);
    }
    if(status == 'feedback'){
        feedbackTasks.push(taskId);
    }
    if(status == 'done'){
        doneTasks.push(taskId);
    }   
}