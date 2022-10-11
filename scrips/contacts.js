async function init(){
    await includeHTML();
    markActivePage('contacts');
    await downloadFromServer();
    contacts = backend.getItem('contacts') || [];
    renderallcontact();
}
let contacts = [{
    'name': 'Anton Mayer',
    'shortName' : 'AM',
    'email' : 'anton@gmail.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#FF7A00'
},
{
    'name': 'Anja Schulz',
    'shortName' : 'AS',
    'email' : 'schulz@hotmail.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#9327FF'
},
{
    'name': 'Benedikt Ziegler',
    'shortName' : 'BZ',
    'email' : 'Benedikt@gmail.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#29ABE2'
},
{
    'name': 'David Eisenberg',
    'shortName' : 'DE',
    'email' : 'davidberg@gmail.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#FC71FF'
},
{
    'name': 'Eva Fischer',
    'shortName' : 'DE',
    'email' : 'eva@gmail.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#02CF2F'
},
{
    'name': 'Emmanuel Mauer',
    'shortName' : 'EM',
    'email' : 'emmanuelMa@gmail.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#AF1616'
},
{
    'name': 'Marcel Bauer',
    'shortName' : 'MB',
    'email' : 'bauer@gmail.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#462F8A'
},
{
    'name': 'Nina Molberg',
    'shortName' : 'NM',
    'email' : 'molberg@gmx.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#FF4646'
},
{
    'name': 'Olaf Schuhmacher',
    'shortName' : 'OS',
    'email' : 'olaf.schuhmacher@gmx.com',
    'mobil' : '+49 1111 111 11 11',
    'color' : '#FF7A00'
},
];
    
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