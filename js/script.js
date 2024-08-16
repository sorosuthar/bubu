const crsr = document.querySelector(".crsr");


firstImg = crsr.querySelectorAll(".wrpr img")[0];
arrowIcons = document.querySelectorAll(".wrpr i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;


const showHideIcons = () => {
    let scrollWidth = crsr.scrollWidth - crsr.clientWidth;
    arrowIcons[0].style.display = crsr.scrollLeft == 0 ? "none" : "block";


    arrowIcons[1].style.display = crsr.scrollLeft == scrollWidth ? "none" : "block";

}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let fistImgWidth = firstImg.clientWidth + 14;

        crsr.scrollLeft += icon.id == "left" ? - fistImgWidth : fistImgWidth;
        setTimeout(() => showHideIcons(), 60);

    });
});

const autoSlide = () => {
    if (crsr.scrollLeft == (crsr.scrollWidth - crsr.clientWidth)) return;





    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDiffrence = firstImgWidth - positionDiff;
    if (crsr.scrollLeft > prevScrollLeft) {
        return crsr.scrollLeft += positionDiff > firstImgWidth / 3 ? valDiffrence : -positionDiff;
    }
    crsr.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDiffrence : -positionDiff;

}
const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = crsr.scrollLeft;


}
const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    crsr.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;

    crsr.scrollLeft = prevScrollLeft - positionDiff;

    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    crsr.classList.remove("dragging");
    if (!isDragging) return;
    isDragging = false
    autoSlide();
}

crsr.addEventListener("mousedown", dragStart);
crsr.addEventListener("touchstart", dragStart);

crsr.addEventListener("mousemove", dragging);
crsr.addEventListener("touchmove", dragging);

crsr.addEventListener("mouseup", dragStop);
crsr.addEventListener("mouseleave", dragStop);
crsr.addEventListener("touchend", dragStop);













