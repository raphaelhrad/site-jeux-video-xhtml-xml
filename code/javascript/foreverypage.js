"use strict";
// Raphaël Heraud
// Fonction d'affichage de l'heure
function displayHour() {
    const now = new Date();
    const dateSpan = document.getElementById("date");
    if (dateSpan) {
        const hours = now.getHours();
        const minutes = ('0' + now.getMinutes()).slice(-2); // Alternative à padStart()
        dateSpan.innerText = hours + "h" + minutes;
        dateSpan.style.border = "none";
        dateSpan.style.fontSize = "1.5em";
        dateSpan.style.color = "inherit";
        dateSpan.style.fontFamily = "Work Sans, sans-serif";
        dateSpan.style.fontStyle = "bold";
    }
}
// Équivalent de onload dans body
document.addEventListener("DOMContentLoaded", function () {
    displayHour();
});
// Active une feuille de style
function setActiveStyleSheet(title) {
    const links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
        const a = links[i];
        const rel = a.getAttribute("rel");
        const linkTitle = a.getAttribute("title");
        if (rel && linkTitle && rel.indexOf("style") !== -1) {
            a.disabled = true;
            if (linkTitle === title) {
                a.disabled = false;
            }
        }
    }
}
// Récupère la feuille de style active
function getActiveStyleSheet() {
    const links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
        const a = links[i];
        const rel = a.getAttribute("rel");
        const linkTitle = a.getAttribute("title");
        if (rel && linkTitle &&
            rel.indexOf("style") !== -1 &&
            !a.disabled) {
            return linkTitle;
        }
    }
    return null;
}
// Récupère la feuille de style préférée
function getPreferredStyleSheet() {
    const links = document.getElementsByTagName("link");
    for (let i = 0; i < links.length; i++) {
        const a = links[i];
        const rel = a.getAttribute("rel");
        const linkTitle = a.getAttribute("title");
        if (rel && linkTitle &&
            rel.indexOf("style") !== -1 &&
            rel.indexOf("alt") === -1) {
            return linkTitle;
        }
    }
    return null;
}
// Crée un cookie
function createCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
// Lit un cookie
function readCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let c of ca) {
        c = c.trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length);
        }
    }
    return null;
}
// Bascule entre les deux thèmes
function toggleStyle() {
    const currentStyle = getActiveStyleSheet();
    const newStyle = (currentStyle === "Style alternatif") ? "Style principal" : "Style alternatif";
    setActiveStyleSheet(newStyle);
    createCookie("style", newStyle, 365);
}
// Applique le thème choisi au chargement
window.onload = () => {
    const cookie = readCookie("style");
    const title = cookie ? cookie : getPreferredStyleSheet();
    if (title) {
        setActiveStyleSheet(title);
    }
};
// Ajout de l'événement sur le bouton de bascule
const switchButton = document.getElementById("switch");
if (switchButton) {
    switchButton.addEventListener("click", toggleStyle);
}