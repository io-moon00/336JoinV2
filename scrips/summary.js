let currentDate;

async function init(){
    await includeHTML();
    markActivePage('summary');
    showUserName();
    setDate();
}


function showUserName(){
    document.getElementById('user-name').innerHTML = userName;
}


function setDate(){
    currentDate = new Date();
    console.log(currentDate);
    var day = String(currentDate.getDate()).padStart(2, '0');
    var month = currentDate.toLocaleString('default', { month: 'long' });
    var year = currentDate.getFullYear();
    document.getElementById('date').innerHTML = `${month} ${day}, ${year}`
}
