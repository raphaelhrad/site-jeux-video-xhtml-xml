// Raphaël Heraud

// Donne le format dans lequel on affichera les dates et heures
function formatDateTime() {
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
// Affiche un message d'erreur
function showError(element, message) {
    element.style.borderColor = 'red';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '12px';
    errorDiv.textContent = message;
    const parent = element.parentNode;
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    parent.appendChild(errorDiv);
}
// Réinitialise un champ
function resetField(element) {
    element.style.borderColor = '';
    const parent = element.parentNode;
    const errorDiv = parent.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}
// Validation des champs texte
const nameInput = document.getElementById('name');
const devInput = document.getElementById('dev');
const dateInput = document.getElementById('inputdate');
const msgInput = document.getElementById('msg');
nameInput.addEventListener('blur', function () {
    if (this.value.length < 2) {
        showError(this, 'Le nom du jeu doit contenir au moins 2 caractères');
    }
    else {
        resetField(this);
    }
});
devInput.addEventListener('blur', function () {
    if (this.value.length < 2) {
        showError(this, 'Le nom du développeur doit contenir au moins 2 caractères');
    }
    else {
        resetField(this);
    }
});
dateInput.addEventListener('blur', function () {
    const selectedDate = new Date(this.value);
    const today = new Date();
    if (selectedDate > today) {
        showError(this, 'La date ne peut pas être dans le futur');
    }
    else {
        resetField(this);
    }
});
msgInput.addEventListener('blur', function () {
    if (this.value.trim().length < 10) {
        showError(this, 'Le message doit contenir au moins 10 caractères');
    }
    else {
        resetField(this);
    }
});
// Validation des boutons radio
const recontactRadios = document.getElementsByName('recontact');
recontactRadios.forEach(radio => {
    radio.addEventListener('blur', function () {
        let isChecked = false;
        recontactRadios.forEach(r => {
            if (r.checked) {
                isChecked = true;
            }
        });
        if (!isChecked) {
            showError(this, 'Veuillez sélectionner une option');
        }
        else {
            resetField(this);
        }
    });
});
// Validation du formulaire
const validateButton = document.querySelector('.validate-button2');
validateButton.addEventListener('click', function () {
    let isValid = true;
    [nameInput, devInput, dateInput, msgInput].forEach(element => {
        element.dispatchEvent(new Event('blur'));
        const parent = element.parentNode;
        if (parent.querySelector('.error-message')) {
            isValid = false;
        }
    });
    let recontactChecked = false;
    recontactRadios.forEach(radio => {
        if (radio.checked) {
            recontactChecked = true;
        }
    });
    if (!recontactChecked) {
        showError(recontactRadios[0], 'Veuillez sélectionner une option');
        isValid = false;
    }
    if (isValid) {
        alert('Le formulaire est valide !');
    }
    else {
        alert('Veuillez corriger les erreurs dans le formulaire.');
    }
});
// Affichage d’un récapitulatif
const showRecapButton = document.getElementById('showRecap2');
const recapDiv = document.getElementById('recap2');
const recapContent = document.getElementById('recap-content2');
showRecapButton.addEventListener('click', function () {
    if (recapDiv.style.display === 'block') {
        recapDiv.style.display = 'none';
        showRecapButton.textContent = 'Afficher le récapitulatif';
        return;
    }
    const nom = nameInput.value;
    const dev = devInput.value;
    const date = dateInput.value;
    const msg = msgInput.value.trim();
    let rct = null;
    recontactRadios.forEach((radio) => {
        if (radio.checked) {
            rct = radio.value;
        }
    });
    const recapHTML = `
        <p><strong>Date et heure de consultation :</strong> ${formatDateTime()}</p>
        <hr/>
        <h3>Informations saisies :</h3>
        <ul>
            <li><strong>Nom du jeu :</strong> ${nom || 'Non renseigné'}</li>
            <li><strong>Développeur(s) :</strong> ${dev || 'Non renseigné(s)'}</li>
            <li><strong>Date de sortie :</strong> ${date || 'Non renseignée'}</li>
            <li><strong>Message :</strong> ${msg || 'Non renseigné'}</li>
            <li><strong>Accepte d'être contacté :</strong> ${rct === 'yes' ? 'Oui' : rct === 'no' ? 'Non' : 'Non renseigné'}</li>
        </ul>
    `;
    recapContent.innerHTML = recapHTML;
    recapDiv.style.display = 'block';
    showRecapButton.textContent = 'Masquer le récapitulatif';
    recapDiv.scrollIntoView({ behavior: 'smooth' });
});