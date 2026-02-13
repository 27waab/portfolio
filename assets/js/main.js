let menuBtn = document.getElementById("menuBtn");
let closeBtn = document.getElementById("closeMenu");
let nav = document.querySelector("nav");


menuBtn.addEventListener("click", () => {
    nav.classList.add("open");
    document.body.style.overflow = "hidden";
})
closeBtn.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.style.overflow = "auto";
})
