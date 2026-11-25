// Cloé Biringer
const carouselImage = document.getElementById("carouselImage");
const nextButton = document.getElementById("nextButton");
const previousButton = document.getElementById("previousButton");
if (!carouselImage || !nextButton || !previousButton) {
    console.error("Éléments du carousel non trouvés");
    throw new Error("Éléments du carousel non trouvés");
}
const interval = window.setInterval(showNext, 4000);
const images = [
    { src: "./Images/dofus.jpg", alt: "Dofus" },
    { src: "./Images/mk8.jpg", alt: "Mario Kart 8 Deluxe" },
    { src: "./Images/lis.jpg", alt: "Life Is Strange" },
    { src: "./Images/tomodachilife.jpg", alt: "Tomodachi Life" },
];
let imageToShow = 0;
showImage(imageToShow);
previousButton.onclick = () => {
    clearInterval(interval);
    showPrevious(); // Correction du nom de la fonction
};
nextButton.onclick = () => {
    clearInterval(interval);
    showNext();
};
function showImage(num) {
    const img = images[num];
    carouselImage.src = img.src;
    carouselImage.alt = img.alt;
}
function showNext() {
    imageToShow = (imageToShow + 1) % images.length;
    showImage(imageToShow);
}
function showPrevious() {
    imageToShow = imageToShow - 1 >= 0 ? imageToShow - 1 : images.length - 1;
    showImage(imageToShow);
}
