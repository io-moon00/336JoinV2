setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');
let contacts = [
{
    "name": "Anton Mayer",
    "shortName": "AM",
    "email": "antonMayer@gmail.com",
    "phone": "+49 123456789",
},
{
    "name": "Anja Schulz",
    "shortName": "AS",
    "email": "anjaSchulz@hotmail.com",
    "phone": "+49 123456789",
},
{
    "name": "Benedikt Ziegler",
    "shortName": "BZ",
    "email": "benediktZiegler@yahoo.com",
    "phone": "+49 123456789",
},
{
    "name": "David Eisenberg",
    "shortName": "DE",
    "email": "davidEisenberg@gmail.com",
    "phone": "+49 123456789",
},
{
    "name": "Eva Fischer",
    "shortName": "EF",
    "email": "eva@gmail.com",
    "phone": "+49 123456789",
},
{
    "name": "Emmanuel Mauer",
    "shortName": "EM",
    "email": "emmanuelMa@gmail.com",
    "phone": "+49 123456789",
},
{
    "name": "Marcel Bauer",
    "shortName": "MB",
    "email": "bauer@gmail.com",
    "phone": "+49 123456789",
},
{
    "name": "Tajana Wolf",
    "shortName": "TW",
    "email": "wolf@gmail.com",
    "phone": "+49 123456789",
},
];//backend geladen werden

let colors = ['#FF7A00', '#9327FF', '#29ABE2', '#FC71FF', '#02CF2F', '#AF1616', '#462F8A', '#FF4646', 'orange', 'deeppink'];
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
    await includeHTML();
    for (let i = 0; i < contacts.length; i++) {
        let letter = getFirstCharacter(i);
        console.log(letter);
        document.getElementById(letter).innerHTML += generalContactPost(i);
        generalContactPost(i);
        showEditContact(i);
        detailContact(i);
        newContact(i);
    }
}
function getFirstCharacter(i) {
    let letter = contacts[i].name.charAt(0);
    letter = letter.toUpperCase();
    return letter;
}

function generalContactPost(i) {
    return`
    <div class="contact-name-container display-start" onclick="showContact(${i})">
        <span class="kontakt-circle" style="background-color:${colors[i]};">${contacts[i]['shortName']}</span>
        <div class="mail-name">
            <span class="contact-name">${contacts[i]['name']}</span>
            <span class="contact-name" style="color:#4589FF">${contacts[i]['email']}</span>
        </div>
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
    detailContact(i);
}


function returnShowContact() {
    document.getElementById('contact').classList.remove('show-overlay-contact');
    document.getElementById('contact').classList.add('overlay-contact');
}


function addContact() {
    contacts.push({ name: "Severin Wenger", email: "asdfas@ksjfa.de", mobile: "2314235123521", color: "dfagad" });
    //backend.setItem('contacts', JSON.stringify(contacts));
    // clear contacact Form
    // generate Msg
}
function removeContact(i) {
    contacts-splice(i, 1);
    generalContactPost()

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
function cancelList() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
}
function addNewContact() {
    let name = document.getElementById('contactName').value;
    let email = document.getElementById('contactEmail').value;
    let mobile = document.getElementById('contactPhone').value;
    
/*    if(name && email && mobile) {
        contacts.push({name: name, email: email, mobile: mobile, color: "dfagad" });
        backend.setItem('contacts', JSON.stringify(contacts));
        cancelList();
        console.log("Kontakt erfolgreich hinzugefügt");
    } else {
        alert('Bitte füge einen Name, die Email-Adresse und Telefon hinzu');
    }*/
}

function addTaskContact() {
    window.open('./addTask.html');
}

function detailContact(i) {
    document. getElementById('contact').innerHTML +=`
    <div class="display-column" id="detailContact">
        <div class="display-center margin-top">
            <div class="kontakt-circle-big" style="background-color: ${colors[i]};>
            <span class="contact-name-contact">${contacts[i]['shortName']}</span>
            </div>
            <div class="mail-name">
                <div class="contact-name" style="color:#4589FF">
                    <img src="../img/plus-blue.svg">
                    <span onclick="addTaskContact()" class="add-task">Add Task</span>
                </div>
            </div>
            <div class="crossEditContact"><img onclick="showContact()" src="../img/close-cross.svg"></div>
    </div>
        <div>
            <div class="contact-view">
                <span class=""><b>Contact Information</b></span>
                <div onclick="editContact(${i})" class="editContact">
                    <img class="pencil" src="../img/pencil_1.svg">
                    <span class="edit-contact">Edit Contact</span>
                </div>
            </div>
                <div class="margin-top">
                    <span><b>Email</b></span>
                </div>
                <div>
                    <span" style="color:#4589FF">${contacts[i]['email']}</span>
                </div>
                <div class="margin-top">
                    <span><b>Mobil:</b></span>
                </div>
                <div>
                    <span>${contacts[i]['phone']}</span>
                </div>
        </div>
    `
    ;
}

function editContact(i) {
    if (clicked) {
        returnEditContact();
        clicked = false;
    } else {
        document.getElementById('editContact').classList.remove('d-none');
        clicked = true;
    }
}
function returnEditContact() {
    document.getElementById('editContact').classList.add('d-none');
}

function saveEditContact() {
    contacts.push({ name: "Severin Wenger", email: "asdfas@ksjfa.de", mobile: "2314235123521"});
    save();
}

function showEditContact(i) {
    document.getElementById('editContact').innerHTML = `
    <div>
        <div class="close-new-cotact">
            <img onclick="returnEditContact(${i})" src="../img/close-cross-white.svg">
        </div>
        <div class="new-contact-header">
            <img src="../img/logo-white.svg">
            <h2>Edit contact</h2>
            <span>Tasks are better with a team!</span>
        </div>
    </div>
    <form class="new-contact-list">
        <div class="kontakt-circle-add" style="background-color:${colors[i]};">${contacts[i]['shortName']}</div>
        <div class="new-contact-list-colum">
            <input id="editContactName" pattern="[A-Za-z]+" required minlength="2" class="input-title-user" type="text" placeholder="Name">
            <img src="../img/User.svg">
        </div>
        <div class="new-contact-list-colum">
            <input id="editContactEmail" required class="input-title-user" type="email" placeholder="Email">
            <img src="../img/eMail-icon.svg">
        </div>
        <div class="new-contact-list-colum">
            <input id="editContactPhone" class="input-title-user" type="number" min="10" placeholder="Phone">
            <img src="../img/phone.svg">
        </div>
        <div class="btn-conect-btn">
            <button class="btn-save" onclick="saveEditContact()">Save</button>
        </div>
    </form>
    `
}