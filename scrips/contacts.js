let contacts = [];

setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');

async function init() {
    await includeHTML();
    markActivePage('contacts');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    printAlphabetLine ();
    await renderAllContact();
    deletEmptyAlphabetLines();
}


async function renderAllContact() {
    for (let i = 0; i < contacts.length; i++) {
        let firstLetter = getFirstCharacter(i);
        document.getElementById(firstLetter).innerHTML += generalContactPostHTML(i); 
    }
}


function getFirstCharacter(i) {
    let letter = contacts[i].name.charAt(0);
    letter = letter.toUpperCase();
    return letter;
}


async function showContact(i) {
    printAlphabetLine ();
    await renderAllContact();
    deletEmptyAlphabetLines();
    document.getElementById('contact-details').classList.add('slide-in-right');
    document. getElementById('contact-details').innerHTML = detailContactHTML(i);
    markActiveContact(i);
}

function markActiveContact(i){
    document.getElementById('contact-'+i).classList.remove('active-contact');
    document.getElementById('contact-'+i).classList.remove('contact-container-hover');
}


function openNewContactForm() {
    document.getElementById('newContact').classList.remove('d-none');
    setTimeout(function (){
        document.getElementById('slide-effekt').classList.add('slide-in-left');
    }, 50);
    document.getElementById('new-contact-form').classList.remove('d-none');
    document.getElementById('new-contact-subtitle').innerHTML = 'Tasks are better with a team!';
}


function showEditContactHTML(i) {
    document.getElementById('newContact').classList.remove('d-none');
    setTimeout(function (){
        document.getElementById('slide-effekt').classList.add('slide-in-left');
    }, 10);
    document.getElementById('edit-contact-form').classList.remove('d-none');
    document.getElementById('contact-form-title').innerHTML = "Edit contact";
    document.getElementById('contact-circle-edit').innerHTML = contacts[i].shortName;
    document.getElementById('contact-circle-edit').style.background = contacts[i].color;
    document.getElementById('contactName').value = contacts[i].name;
    document.getElementById('contactEmail').value = contacts[i].email;
    document.getElementById('contactPhone').value = contacts[i].mobil;
}


function closeContactForm(){   
    document.getElementById('slide-effekt').classList.remove('slide-in-left');
    document.getElementById('slide-effekt').classList.add('slide-out-left');
    setTimeout(function (){
        document.getElementById('new-contact-form').classList.add('d-none');
        document.getElementById('edit-contact-form').classList.add('d-none');
        document.getElementById('slide-effekt').classList.remove('slide-out-left');
        document.getElementById('newContact').classList.add('d-none');
    }, 225);
}


async function saveContact(i) {
    let name = document.getElementById('contactName');
    let email = document.getElementById('contactEmail');
    let mobile = document.getElementById('contactPhone');
    contacts[i].name = name;
    contacts[i].email = email;
    contacts[i].mobil = mobile;
    await saveContactsToServer();
}


async function addNewContact() {
    let shortName = getContactInitials(name.value).toUpperCase();
    let color = getRandomColor();
    let contactInfo = {
        "name": getInputValues[0].value,
        "email": getInputValues[1].value,
        "mobil": getInputValues[2].value,
        "shortName": shortName,
        "color": color,
        };
    contacts.push(contactInfo);
    await saveContactsToServer();
    clearForm();
    setTimeout(function (){
    document.getElementById('newContact').classList.add('d-none');
    renderContacts();
    }, 500);
    renderContacts();
}


function getInputValues(){
    let name = document.getElementById('newContactName').value;
    let email = document.getElementById('newContactEmail').value;
    let mobile = document.getElementById('newContactPhone').value;
    return [name, email, mobile];
}


function clearForm(){
    for(i=0; i<getInputValues().length;i++){
        getInputValues()[i].innerHTML = '';
    }
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var colors = '#';
    for (var i = 0; i < 6; i++) {
      colors += letters[Math.floor(Math.random() * 16)];
    }
    return colors;
  }


async function saveContactsToServer() {
    await backend.setItem('contacts', JSON.stringify(contacts));
}


function renderContacts() {
    for (let i = 0; i < contacts.length; i++) {
    generalContactPostHTML(i);
    }
 }


function getContactInitials(name) {
    let stringName = name;
    let stringletters = stringName.match(/\b(\w)/g);
    let initials;  
    if (stringletters.length > 1) {
        initials = stringletters[0] + stringletters[1];
    } else {
        initials = stringletters[0];
    }
    return initials
}


function addTaskContact() {
    window.open('./addTask.html');
}


function printAlphabetLine(){
document.getElementById('contact-list').innerHTML = '';
for (i = 65; i <= 90; i++) {
    let character = String.fromCharCode(i);
    document.getElementById('contact-list').innerHTML +=`    
    <div>
        <div class="separator-line">${character}</div>
        <div id= ${character}></div>
    </div>`
    }
}


function deletEmptyAlphabetLines(){
    for (i = 65; i <= 90; i++){
        let character = String.fromCharCode(i);
        if (document.getElementById(character).innerHTML === "" ){ 
            parentDiv = document.getElementById(character).parentElement;
            parentDiv.classList.add('d-none');
        }
    } 
}