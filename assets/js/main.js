let menuBtn = document.getElementById("menuBtn");
let closeBtn = document.getElementById("closeMenu");
let nav = document.querySelector("nav");
const jsonURL = "./assets/projects.json";
const container = document.getElementById('projects-container');

menuBtn.addEventListener("click", () => {
    nav.classList.add("open");
    document.body.style.overflow = "hidden";
})
closeBtn.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.style.overflow = "auto";
})

fetch(jsonURL)
    .then(response => response.json())
    .then(projects => {
        const firstThree = projects.slice(0, 3);
        firstThree.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card bg-white rounded-2xl border';
            card.innerHTML = `
                <div class="head text-2xl font-bold mb-2 px-4 pt-4 flex items-center justify-between">
                    <p>${project.title}</p>
                    <a href="${project.liveDemo}" target="_blank">
                        <div class="w-10 h-10 border rounded-full flex items-center justify-center">
                            <i class="hgi hgi-stroke hgi-view font-normal"></i>
                        </div>
                    </a>
                </div>
                <div class="image">
                    <img src="${project.image}" alt="${project.title}" class="w-full">
                </div>
                <div class="mb-2 px-4 pt-4">
                    <a href="${project.github}" target="_blank" class="flex items-center justify-center py-1 px-2 rounded-full bg-white border w-full">
                        <i class="hgi hgi-stroke hgi-github mr-2"></i>
                        <p>source code in github</p>
                    </a>
                </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(err => console.error('Error fetching projects:', err));

const langBtn = document.getElementById("langChange");
let currentLang = localStorage.getItem("lang") || "en";

applyLanguage(currentLang);

langBtn.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("lang", currentLang);
    applyLanguage(currentLang);
});

function applyLanguage(lang) {
    const elements = document.querySelectorAll("[data-en]");
    elements.forEach(el => {
        el.innerText = el.getAttribute(`data-${lang}`);
    });
    if (lang === "ar") {
        document.documentElement.setAttribute("dir", "rtl");
        document.documentElement.setAttribute("lang", "ar");
        document.body.style.fontFamily = "'IBM Plex Sans Arabic', sans-serif";
    } else {
        document.documentElement.setAttribute("dir", "ltr");
        document.documentElement.setAttribute("lang", "en");
        document.body.style.fontFamily = "'Poppins', sans-serif";
    }
    fixSpacing(lang);
}

function fixSpacing(lang) {
    const elements = document.querySelectorAll("[class*='mr-'], [class*='ml-'], [class*='pr-'], [class*='pl-'], .text-left, .text-right");
    elements.forEach(el => {
        const classes = Array.from(el.classList);
        classes.forEach(cls => {
            if (cls.startsWith("mr-")) {
                el.classList.remove(cls);
                el.classList.add(lang === "ar" ? cls.replace("mr-", "ml-") : cls);
            }
            else if (cls.startsWith("ml-")) {
                el.classList.remove(cls);
                el.classList.add(lang === "ar"
                    ? cls.replace("ml-", "mr-")
                    : cls);
            }
            else if (cls.startsWith("pr-")) {
                el.classList.remove(cls);
                el.classList.add(lang === "ar" ? cls.replace("pr-", "pl-") : cls);
            }
            else if (cls.startsWith("pl-")) {
                el.classList.remove(cls);
                el.classList.add(lang === "ar" ? cls.replace("pl-", "pr-") : cls);
            }
            else if (cls === "text-left") {
                el.classList.remove("text-left");
                el.classList.add(lang === "ar" ? "text-right" : "text-left");
            }
            else if (cls === "text-right") {
                el.classList.remove("text-right");
                el.classList.add(lang === "ar" ? "text-left" : "text-right");
            }
        });
    });
}
