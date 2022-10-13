setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');
let users = [];

async function init(){
    await downloadFromServer();
    users = backend.getItem('users') || [];
}


function logIn(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let user = users.find(u => u.email == email && u.password == password);
    if (user){
        setUserName(user.name);
        window.location.href = '/pages/summary.html';
    }
    else{
        alert('kein User mit dem Login gefunden. Bitte erneut versuchen.');
    }
}


function goToLogin(){
    window.location.href = '../index.html'
}
function openRegisterPage(){
    window.location.href ='/pages/register.html?name='
}

function addUser(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    try{
        clearRegisterPanel();
        users.push({name: name, email: email, password: password});
        backend.setItem('users', JSON.stringify(users));
        window.location.href = '/pages/summary.html';
    }
    catch(e){
        console.log(e);
    }

}

function clearRegisterPanel(){
    document.getElementById('name').innerHTML='';
    document.getElementById('email').innerHTML='';
    document.getElementById('password').innerHTML='';
}

function guestLogin(){
    setUserName('Guest');
    window.location.href = '/pages/summary.html';
}