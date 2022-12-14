let contacts = [];//backend geladen werden

setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');



function save() {
    let contactsAsText = JSON.stringify(contacts);
    localStorage.setItem('contacts',contactsAsText);
}
async function init() {
    await includeHTML();
    markActivePage('contacts');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    renderAllContact();
}
async function renderAllContact() {
    for (let i = 0; i < contacts.length; i++) {
        let letter = getFirstCharacter(i);
        console.log(letter);
        document.getElementById(letter).innerHTML += generalContactPostHTML(i);
        generalContactPostHTML(i);
    }
}
function renderContact() {
    for (let i = 0; i < generalContact.length; i++) {
        generalContactPostHTML(i)
    }
}
function getFirstCharacter(i) {
    let letter = contacts[i].name.charAt(0);
    letter = letter.toUpperCase();
    return letter;
}

function generalContactPostHTML(i) {
    return`
    <div class="contact-name-container display-start" onclick="showContact(${i})">
        <div class="contact-container-start">
            <span class="kontakt-circle" style="background-color:${contacts[i]['color']};">${contacts[i]['shortName']}</span>
            <div class="mail-name">
                <span class="contact-name">${contacts[i]['name']}</span>
                <span class="contact-name" style="color:#4589FF">${contacts[i]['email']}</span>
            </div>
        </div>
        <div class="crossEditContactNew"><img onclick="removeContact(${i})" src="../img/close-cross.svg"></div>
    </div>
  `
}
function showContactPost(i) {
    document.getElementById('contactNameShowDetail').innerHTML = contacts[i].name;
}

let clicked = false;
function showContact(i) {
    document.getElementById('contact').innerHTML ='';
    if (clicked) {
        returnShowContact(i);
        clicked = false;
    } else {
        document.getElementById('contact').classList.add('show-overlay-contact');
        document.getElementById('contact').classList.remove('overlay-contact');
        clicked = true;
    }
    detailContactHTML(i);
}

function returnShowContact() {
    document.getElementById('contact').classList.remove('show-overlay-contact');
    document.getElementById('contact').classList.add('overlay-contact');
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var colors = '#';
    for (var i = 0; i < 6; i++) {
      colors += letters[Math.floor(Math.random() * 16)];
    }
    return colors;
  }

function saveEditContact() {
    addNewContact();
}

function createNewContact() {
    addNewContact();
}

function addNewContact() {
    let name = document.getElementById('contactName');
    let email = document.getElementById('contactEmail');
    let mobile = document.getElementById('contactPhone');
    let shortName = getContactInitials(name.value).toUpperCase();
    let color = getRandomColor();

    let contactInfo = {
        "name": name.value,
        "email": email.value,
        "mobil": mobile.value,
        "shortName": shortName,
        "color": color,
        };
        contacts.push(contactInfo);
        saveContactsToServer();

        name = '';
        email = '';
        mobile = '';
        shortName = '';
        color = '';

        setTimeout(function (){
        document.getElementById('newContact').classList.add('d-none')
        }, 500);

}

async function saveContactsToServer() {
    await backend.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}
function renderContacts() {
//    document.getElementById('contacts').innerHTML = '';
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

// Name für Küzel aufteilen//
function getshortName() {
    let names = string.split(contacts[i].name);
    let shortName = contacts[i]['shortName'];
    names = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        shortName += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return shortName;
}

function removeContact(i) {
    contacts.splice(i, 1);
    saveContactsToServer();
}

function newContact(i) {
    if (clicked) {
        returnNewContact();
        clicked = false;
    } else {
        document.getElementById('newContact').classList.remove('d-none');
        clicked = true;
    }
}
function returnNewContact() {
    document.getElementById('newContact').classList.add('d-none');
}

function addTaskContact() {
    window.open('./addTask.html');
}

function detailContactHTML(i) {
    document. getElementById('contact').innerHTML +=
    ` <div class="display-column" id="detailContact">
        <div class="display-center margin-top">
            <div class="kontakt-circle-big" style="background-color: ${contacts[i]['color']};>
            <span class="contact-name-contact">${contacts[i]['shortName']}</span>
            </div>
            <div>
                <div class="contact-name-h2">
                    <span><b>${contacts[i]['name']}</b></span>
                </div>
                <div class="mail-name">
                    <div class="contact-name" style="color:#4589FF">
                        <img src="../img/plus-blue.svg">
                        <span onclick="addTaskContact()" class="add-task">Add Task</span>
                    </div>
                </div>
            </div>
            <div class="crossEditContact"><img onclick="showContact()" src="../img/close-cross.svg"></div>
    </div>
        <div>
            <div class="contact-view">
                <span><b>Contact Information</b></span>
                <div onclick="showEditContactHTML(${i})" class="editContact">
                    <img class="pencil" src="../img/pencil_layout.svg">
                    <span>Edit Contact</span>
                </div>
            </div>
                <div class="margin-top">
                    <span><b>Email</b></span>
                </div>
                <div>
                    <span style="color:#4589FF">${contacts[i]['email']}</span>
                </div>
                <div class="margin-top">
                    <span><b>Mobil:</b></span>
                </div>
                <div>
                    <span>${contacts[i]['mobil']}</span>
                </div>
        </div>
    `;
}



function closeEditContact() {
    document.getElementById('editContact').innerHTML = '';
    document.getElementById('editContact').classList.add('d-none');
}

function showEditContactHTML(i) {
    document.getElementById('editContact').classList.remove('d-none');
    document.getElementById('editContact').innerHTML = `
    <div>
        <div class="close-new-cotact">
            <img onclick="closeEditContact()" src="../img/close-cross-white.svg">
        </div>
        <div class="new-contact-header">
            <img src="../img/logo-white.svg">
            <h2>Edit contact</h2>
            <span>Tasks are better with a team!</span>
        </div>
    </div>
    <form class="new-contact-list" onsubmit="saveEditContact()">
        <div class="kontakt-circle-add" style="background-color:${contacts[i]['color']};">${contacts[i].shortName}</div>
        <div class="new-contact-list-colum">
            <input id="editContactName" required class="input-title-user" type="text" placeholder="${contacts[i].name}">
            <img src="../img/User.svg">
        </div>
        <div class="new-contact-list-colum">
            <input id="editContactEmail" required class="input-title-user" type="email" placeholder="${contacts[i].email}">
            <img src="../img/eMail-icon.svg">
        </div>
        <div class="new-contact-list-colum">
            <input id="editContactPhone" required class="input-title-user" type="number" placeholder="${contacts[i].mobil}">
            <img src="../img/phone.svg">
        </div>
        <div class="btn-conect-btn">
            <button class="btn-save">Save</button>
        </div>
    </form>
    `
}
