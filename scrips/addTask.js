let selectedUsers = [];


async function init(){
    await includeHTML();
    markActivePage('addTask');
}

function setTask() {
    task = {
        title: form.elements["tasktitle"].value,
       // urgency: getUrgency(),     Test
        category: form.elements["category"].value,
        duedate: form.elements["dueDate"].value,
        description: form.elements["desc"].value,
        assignedTo: selectedUsers,
       // status: "toBoard",
       // creator: currentUserId,
    };
}

