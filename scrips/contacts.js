setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');
let contacts;

async function init() {
    await includeHTML();
    markActivePage('contacts');
    await downloadFromServer();
    contacts = backend.getItem('contacts') || [];
    renderallcontact();
}

function renderallcontact() {

    for (let i = 0; i < contacts.length; i++) {
        let letter = getFirstCharacter(i);
        document.getElementById(letter).innerHTML += generalCotactPost(i);
        showContactPost(i);
    }

};

function getFirstCharacter(i) {
    let letter = contacts[i].name.charAt(0);
    return letter;
}

function generalCotactPost(i) {
    const contact = contacts[i];
    return `
    <div class="contact-name-container display-start" onclick="showContact(${i})">
        <span class="kontakt-circle" style="background-color: ${contact['color']};">${contact['shortName']}</span>
        <div class="mail-name">
            <span class="contact-name">${contact['name']}</span>
            <span class="contact-name" style="color:#4589FF">${contact['email']}</span>
        </div>
    </div>
  `
}

function showContactPost(i) {
    const contact = contacts[i];
    document.getElementById('detailContact').innerHTML += `
    <div class="display-center margin-top">
        <span class="kontakt-circle-big" style="background-color: ${contact['color']};">${contact['shortName']}</span>
        <div class="mail-name">
            <span class="contact-name-contact">${contact['name']}</span>
            <div class="contact-name" style="color:#4589FF">
                <img src="../img/plus.png">
                <span class="add-task">Add Task</span>
            </div>
        </div>
    </div>
    <div>
        <div class="contact-view">
            <span class=""><b>Contact Information</b></span>
            <div class="">
            <img class="pencil" src="../img/pencil.png">
            <span class="edit-contact">Edit Contact</span>
            </div>
        </div>
        <div class="margin-top">
            <span><b>Email</b></span>
        </div>
        <div>
            <span" style="color:#4589FF">${contact['email']}</span>
        </div>
        <div class="margin-top">
            <span><b>Mobil:</b></span>
        </div>
        <div>
            <span>${contact['mobil']}</span>
        </div>
    </div>
    
    `
}

let clicked = false;
function showContact(i) {

    if (clicked) {
        returnShowContact();
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