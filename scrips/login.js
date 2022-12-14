setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');
let users = [];
let user;

async function init(){
    if(getRememberStatus()){
        window.location.href = '/pages/summary.html';
    }
    await downloadFromServer();
    users = backend.getItem('users') || [];
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


function addUser(){
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    try{
        clearRegisterPanel();
        users.push({name: name, email: email, password: password});
        backend.setItem('users', JSON.stringify(users));
        setUserName(user.name);
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

let passwordVisible = false;
function showEyeIcon(){

    if(!passwordVisible){
        document.getElementById('password-icon').src = '/img/eye.svg';
        document.getElementById('password-icon').onclick = showPassword();
        passwordVisible = true;
    }
    else{
        document.getElementById('password-icon').src = '/img/notEye.svg';
        document.getElementById('password-icon').onclick = hidePassword();
        passwordVisible = false;
    }

}

function showPassword(){
    document.getElementById('password').classList.remove('security-text');
}

function hidePassword(){
    document.getElementById('password').classList.add('security-text');
}

