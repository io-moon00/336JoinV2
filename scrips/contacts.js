async function init(){
    await includeHTML();
    markActivePage('contacts');
    renderallcontact();
}
let contacts = [{
    'name': 'Anton Mayer',
    'shortName' : 'AM',
    'email' : 'anton@gmail.com',
    'mobil' : '+49 1111 111 11 11'
},
{
    'name': 'Anja Schulz',
    'shortName' : 'AS',
    'email' : 'schulz@hotmail.com',
    'mobil' : '+49 1111 111 11 11'
},
{
    'name': 'Benedikt Ziegler',
    'shortName' : 'BZ',
    'email' : 'Benedikt@gmail.com',
    'mobil' : '+49 1111 111 11 11'
},
{
    'name': 'David Eisenberg',
    'shortName' : 'DE',
    'email' : 'davidberg@gmail.com',
    'mobil' : '+49 1111 111 11 11'
},
{
    'name': 'Eva Fischer',
    'shortName' : 'DE',
    'email' : 'eva@gmail.com',
    'mobil' : '+49 1111 111 11 11'
},
{
    'name': 'Emmanuel Mauer',
    'shortName' : 'EM',
    'email' : 'emmanuelMa@gmail.com',
    'mobil' : '+49 1111 111 11 11'
},
{
    'name': 'Marcel Bauer',
    'shortName' : 'MB',
    'email' : 'bauer@gmail.com',
    'mobil' : '+49 1111 111 11 11'
},
{
    'name': 'Nina Molberg',
    'shortName' : 'NM',
    'email' : 'molberg@gmx.com',
    'mobil' : '+49 1111 111 11 11'
},
{
    'name': 'Olaf Schuhmacher',
    'shortName' : 'OS',
    'email' : 'olaf.schuhmacher@gmx.com',
    'mobil' : '+49 1111 111 11 11'
},
];

let colors = {
    A:'#FF7A00', 
    B:'#9327FF', 
    C:'#29ABE2', 
    D:'#FC71FF', 
    E:'#02CF2F', 
    F:'#AF1616', 
    G:'#462F8A', 
    H:'#FF4646',
    I:'',
    J:'',
    K:'',
    L:'',
    M:'',
    N:'',
    O:'',
    P:'',
    Q:'',
    R:'',
    S:'',
    T:'',
    V:'',
    W:'',
    X:'',
    Y:'',
    Z:'',
};

function renderallcontact() {
    let postContactContainer = dokument.getElementById('postContactContainer');
    postContactContainer.innerHTML = ``;

    for (let i = 0; i < contacts.length; i++) {
        postContactContainer.innerHTML += generalCotactPost(i);
    }
};
function renderColors() {
    for (let j = 0; j < colors.length; j++) {
    }
    generalCotactPost(i);
}

function generalCotactPost(i) {
    const contact = contacts[i];
    const color = colors[j];
    return`
    <div>
        <div class="headline">A</div>
    </div>
    <div class="contact-name-container display-start" onclick="showContact()" onclick="returnShowContact()" >
        <span class="kontakt-circle" style="${color['A']}">${contact['shortName']}</span>
        <div class="mail-name">
            <span class="contact-name">${contact['name']}</span>
            <span class="contact-name" style="color:#4589FF">${contact['email']}</span>
        </div>
    </div>
    `
}
 

function showContact() {
    document.getElementById('contact').classList.add('show-overlay-contact');
    document.getElementById('contact').classList.remove('overlay-contact');
}

function returnShowContact() {
    document.getElementById('contact').classList.remove('show-overlay-contact');
    document.getElementById('contact').classList.add('overlay-contact');
}