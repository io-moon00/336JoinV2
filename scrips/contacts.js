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
    printAlphabetLine ();
    await renderAllContact();
    deletEmptyAlphabetLines();
}
async function renderAllContact() {
    for (let i = 0; i < contacts.length; i++) {

        initials(i);
/*        let shortName = contacts[i]['shortName'];
        if (letter[i] == shortName[i]) {
            document.getElementById(letter).innerHTML += generalContactPostHTML(i); 
            findContact = true;
        }
        if (!findContact) {
        document.getElementById(`letterContainer${letter.charAt(0)}`).classList.add("d-none");
        }*/
        generalContactPostHTML(i);
    }
}
function getFirstCharacter(i) {
    let letter = contacts[i].name.charAt(0);
    letter = letter.toUpperCase();
    return letter;
}

function initials(i) {
    let letContainer = document.getElementById(`letterContainer${i}`)
    let letter = getFirstCharacter(i);
    if (letContainer =''){
        document.getElementById(`letterContainer${i}`).classList.add("d-none");
    }else {
        document.getElementById(letter).innerHTML += generalContactPostHTML(i); 
    }
}

function generalContactPostHTML(i) {
    return`
    <div class="contact-name-container display-start">
        <div class="contact-container-start" onclick="showContact(${i})">
            <span class="kontakt-circle" style="background-color:${contacts[i]['color']};">${contacts[i]['shortName']}</span>
            <div class="mail-name">
                <span class="contact-name">${contacts[i]['name']}</span>
                <span class="contact-name" style="color:#4589FF">${contacts[i]['email']}</span>
            </div>
        </div>
    </div>
`
}
//        <div class="crossEditContactNew"><img onclick="removeContact(${i})" src="../img/close-cross.svg"></div>


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

async function addNewContact() {
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
        await saveContactsToServer();

        name.innerHTML = '';
        email.innerHTML = '';
        mobile.innerHTML = '';
        shortName.innerHTML = '';

        setTimeout(function (){
        document.getElementById('newContact').classList.add('d-none');
        renderContacts();
        }, 500);

        await saveContactsToServer();
        renderContacts();

}

async function saveContactsToServer() {
    await backend.setItem('contacts', JSON.stringify(contacts));
}
function renderContacts() {
//    document.getElementById('contacts').innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
    generalContactPostHTML(i);
    }
 }

 // Name für Küzel aufteilen//
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

// siehe oben (ist raus)
/*async function removeContact(i) {
    contacts.splice(i, 1);
    await saveContactsToServer();
    renderContacts();
}*/

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

function printAlphabetLine(){
document.getElementById('generalContactPostHTML').innerHTML = '';
for (i = 65; i <= 90; i++) {
    let character = String.fromCharCode(i);
    document.getElementById('generalContactPostHTML').innerHTML += `    
    <div id="letterContainer">
        <div class="headline">${character}</div>
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