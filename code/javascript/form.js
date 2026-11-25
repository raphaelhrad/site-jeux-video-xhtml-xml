"use strict";
// Cloé Biringer & Raphaël Heraud
var _a, _b, _c, _d, _e;
// Renommer les variables et fonctions qui causent des conflits
const formDateObj = new Date();
let formDay = formDateObj.getDate();
let formMonth = formDateObj.getMonth() + 1;
const formYear = formDateObj.getFullYear();
if (formMonth < 10)
    formMonth = "0" + formMonth;
if (formDay < 10)
    formDay = "0" + formDay;
const formToday = `${formYear}-${formMonth}-${formDay}`;
const formDateInput = document.getElementById("theDate");
if (formDateInput) {
    formDateInput.value = formToday;
}
// Renommer la fonction pour éviter les conflits
function formatDateTimeForm() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return now.toLocaleDateString('fr-FR', options);
}
// Renommer la fonction pour éviter les conflits
function showFormError(element, message) {
    var _a, _b;
    element.style.borderColor = 'red';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.textContent = message;
    const existingError = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    (_b = element.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(errorDiv);
}
// Renommer la fonction pour éviter les conflits
function resetFormField(element) {
    var _a;
    element.style.borderColor = '';
    const errorDiv = (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}
// Fonction qui obtient des informations sur l'utilisateur
function getBrowserInfos() {
    var _a, _b, _c, _d;
    const navigatorInfo = window.navigator;
    const input = document.getElementById("user-agent-informations");
    if (!input)
        return;
    input.value = JSON.stringify({
        navigateur: (_b = (_a = navigatorInfo.userAgentData) === null || _a === void 0 ? void 0 : _a.brands) !== null && _b !== void 0 ? _b : navigatorInfo.userAgent,
        os: (_d = (_c = navigatorInfo.userAgentData) === null || _c === void 0 ? void 0 : _c.platform) !== null && _d !== void 0 ? _d : navigatorInfo.platform,
        langue: navigatorInfo.language
    });
}
getBrowserInfos();
// Fonction de validation d'email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// Ajout des validations individuelles
(_a = document.getElementById('name')) === null || _a === void 0 ? void 0 : _a.addEventListener('blur', function () {
    if (this.value.length < 2) {
        showFormError(this, 'Votre nom doit contenir au moins 2 caractères');
    }
    else {
        resetFormField(this);
    }
});
(_b = document.getElementById('mail')) === null || _b === void 0 ? void 0 : _b.addEventListener('blur', function () {
    if (!isValidEmail(this.value)) {
        showFormError(this, 'Veuillez entrer une adresse email valide');
    }
    else {
        resetFormField(this);
    }
});
(_c = document.getElementById('theDate')) === null || _c === void 0 ? void 0 : _c.addEventListener('blur', function () {
    const selectedDate = new Date(this.value);
    const now = new Date();
    if (selectedDate > now) {
        showFormError(this, 'La date ne peut pas être dans le futur');
    }
    else {
        resetFormField(this);
    }
});
(_d = document.getElementById('msg')) === null || _d === void 0 ? void 0 : _d.addEventListener('blur', function () {
    if (this.value.trim().length < 10) {
        showFormError(this, 'Le message doit contenir au moins 10 caractères');
    }
    else {
        resetFormField(this);
    }
});
// Renommer le bouton de validation
const formValidateButton = document.querySelector('.validate-button');
if (formValidateButton) {
    formValidateButton.addEventListener('click', function () {
        const name = document.getElementById('name');
        const email = document.getElementById('mail');
        const date = document.getElementById('theDate');
        const note = document.getElementById('note');
        const message = document.getElementById('msg');
        let isValid = true;
        [name, email, date, note, message].forEach(el => {
            var _a;
            el.dispatchEvent(new Event('blur'));
            if ((_a = el.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('.error-message')) {
                isValid = false;
            }
        });
        alert(isValid ? 'Le formulaire est valide !' : 'Veuillez corriger les erreurs dans le formulaire.');
    });
}
// Affichage du récapitulatif
(_e = document.getElementById('showRecap')) === null || _e === void 0 ? void 0 : _e.addEventListener('click', function () {
    const recapDiv = document.getElementById('recap');
    const recapContent = document.getElementById('recap-content');
    const button = document.getElementById('showRecap');
    if (recapDiv.style.display === 'block') {
        recapDiv.style.display = 'none';
        button.textContent = 'Afficher le récapitulatif';
        return;
    }
    const nom = document.getElementById('name').value;
    const email = document.getElementById('mail').value;
    const date = document.getElementById('theDate').value;
    const note = document.getElementById('note').value;
    const message = document.getElementById('msg').value.trim();
    const recapHTML = `
        <p><strong>Date et heure de consultation :</strong> ${formatDateTimeForm()}</p>
        <hr/>
        <h3>Informations saisies :</h3>
        <ul>
            <li><strong>Nom :</strong> ${nom || 'Non renseigné'}</li>
            <li><strong>Email :</strong> ${email || 'Non renseigné'}</li>
            <li><strong>Date de visite :</strong> ${date || 'Non renseignée'}</li>
            <li><strong>Note :</strong> ${note || 'Non renseignée'}</li>
            <li><strong>Message :</strong> ${message || 'Non renseigné'}</li>
        </ul>
    `;
    recapContent.innerHTML = recapHTML;
    recapDiv.style.display = 'block';
    button.textContent = 'Masquer le récapitulatif';
    recapDiv.scrollIntoView({ behavior: 'smooth' });
});
