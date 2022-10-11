setURL('https://gruppe-336.developerakademie.net/smallest_backend_ever');
let contacts;

async function init(){
    await includeHTML();
    markActivePage('contacts');
    await downloadFromServer();
    contacts = backend.getItem('contacts') || [];
    renderallcontact();
}

function renderallcontact() {

    for (let i = 0; i < contacts.length; i++) {
        let letter = getFirstCharacter(i);
        console.log(letter);
        document.getElementById(letter).innerHTML += generalCotactPost(i);

    }
};

// 
function getFirstCharacter(i) {
let letter = contacts[i].name.charAt(0);
return letter;
}

function generalCotactPost(i) {
    const contact = contacts[i];
    return`
    <div class="contact-name-container display-start" onclick="showContact()" onclick="returnShowContact()" >
        <span class="kontakt-circle" style="backgroundcolor: ${contact['color']};">${contact['shortName']}</span>
        <div class="mail-name">
            <span class="contact-name">${contact['name']}</span>
            <span class="contact-name" style="color:#4589FF">${contact['email']}</span>
        </div>
    </div>
    `
}

let clicked = false;
function showContact() {

    if (clicked) {
        returnShowContact();
        clicked = false;   
    }else {
        document.getElementById('contact').classList.add('show-overlay-contact');
        document.getElementById('contact').classList.remove('overlay-contact');
        clicked = true;
    }
}

function returnShowContact() {
    document.getElementById('contact').classList.remove('show-overlay-contact');
    document.getElementById('contact').classList.add('overlay-contact');
}

function addContact(){
    contacts.push({name: "Severin Wenger", email: "asdfas@ksjfa.de", mobile: "2314235123521", color: "dfagad"});
    backend.setItem('contacts', JSON.stringify(contacts));
    // clear contacact Form
    // generate Msg
}