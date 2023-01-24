setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');
let users = [];
let user;

async function init(){
    if(getRememberStatus()){
        window.location.href = '/pages/summary.html';
    }
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || []
}


function logIn(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    user = users.find(u => u.email == email && u.password == password);
    if (user){
        setUserName(user.name);
        setRememberStatusToLocalStorage();
        window.location.href = '/pages/summary.html';
    }
    else{
        document.getElementById('wrong-password').classList.remove('d-none');
        document.getElementById('password').placeholder = 'Ups. Try again';
    }
}


function goToLogin(){
    window.location.href = '../index.html';
}


function openRegisterPage(){
    window.location.href ='/pages/register.html';
}


async function addUser(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    try{
        users.push({name: name, email: email, password: password});
        await backend.setItem('users', JSON.stringify(users));
        setUserName(name);
        window.location.href = '/pages/summary.html';
        clearRegisterPanel();
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
    setUserName('Guest')
    window.location.href = '/pages/summary.html';
}


function setUserName(item){
    localStorage.setItem('userName', JSON.stringify(item));
}


function rememberMe(){
    return document.getElementById('checkBox-remember-me');
}


function setRememberStatusToLocalStorage(){
    if(rememberMe){
        localStorage.setItem('remember', 'true');
    }
    else{
        localStorage.setItem('remember', 'false');
    }
}


function getRememberStatus(){
    return JSON.parse(localStorage.getItem('remember'));
}
