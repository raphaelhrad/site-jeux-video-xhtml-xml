// Cloé Biringer

const pagesArray = [
    "Content/Collection/dofus.xhtml",
    "Content/Collection/mk8.xhtml",
    "Content/Collection/lis.xhtml",
    "Content/Collection/tomodachilife.xhtml"
];
const lienPageAleatoire = document.querySelector("a[onclick]");
function redirectRandomSite() {
    if (!lienPageAleatoire)
        return;
    const randomInt = Math.floor(Math.random() * pagesArray.length);
    lienPageAleatoire.href = pagesArray[randomInt];
}