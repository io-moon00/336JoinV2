setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');
let contacts;

async function init() {
    await includeHTML();
    markActivePage('contacts');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
    renderAllContact();
}
function renderAllContact() {

    for (let i = 0; i < contacts.length; i++) {
        let letter = getFirstCharacter(i);
        console.log(letter);
        document.getElementById(letter).innerHTML += generalContactPost(i);
    }
}
function getFirstCharacter(i) {
    let letter = contacts[i].name.charAt(0);
    letter = letter.toUpperCase();
    return letter;
}
function generalContactPost(i) {
    return `
    <div class="contact-name-container display-start" onclick="showContact(${i})">
        <span class="kontakt-circle" style="background-color:${contacts[i].color};">${contacts[i].shortName}</span>
        <div class="mail-name">
            <span class="contact-name">${contacts[i].name}</span>
            <span class="contact-name" style="color:#4589FF">${contacts[i].email}</span>
        </div>
    </div>
  `
}
function showContactPost(i) {
    document.getElementById('contactNameShowDetail').innerHTML = contacts[i].name;
}
let clicked = false;
function showContact(i) {

    if (clicked) {
        returnShowContact(i);
        clicked = false;
    } else {
        document.getElementById('contact').classList.add('show-overlay-contact');
        document.getElementById('contact').classList.remove('overlay-contact');
        clicked = true;
    }
}
function returnShowContact() {
    document.getElementById('contact').classList.remove('show-overlay-contact');
    document.getElementById('contact').classList.add('overlay-contact');
}
function addContact() {
    contacts.push({ name: "Severin Wenger", email: "asdfas@ksjfa.de", mobile: "2314235123521", color: "dfagad" });
    backend.setItem('contacts', JSON.stringify(contacts));
    // clear contacact Form
    // generate Msg
}
function newContact() {
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
    
    if(name && email && mobile) {
        contacts.push({name: name, email: email, mobile: mobile, color: "dfagad" });
        backend.setItem('contacts', JSON.stringify(contacts));
        cancelList();
        console.log("Kontakt erfolgreich hinzugefügt");
    } else {
        alert('Bitte füge einen Name, die Email-Adresse und Telefon hinzu');
    }
}
