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
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'card bg-white rounded-2xl border';
        card.innerHTML = `
        <div class="head text-2xl font-bold mb-2 px-4 pt-4">${project.title}</div>
        <div class="image">
            <img src="${project.image}" alt="${project.title}" class="rounded-t-2xl w-full">
        </div>
        <div class="desc p-4 text-gray-500">${project.description}</div>
        <div class="btns py-4 px-8 flex items-center justify-between">
            <a href="${project.liveDemo}" target="_blank" class="flex items-center justify-evenly py-1 px-2 rounded-full bg-white border w-1/2 mx-1">
                <i class="hgi hgi-stroke hgi-eye"></i>
                <p>live Demo</p>
            </a>
            <a href="${project.github}" target="_blank" class="flex items-center justify-evenly py-1 px-2 rounded-full bg-white border w-1/2 mx-1">
                <i class="hgi hgi-stroke hgi-github"></i>
                <p>GitHub</p>
            </a>
        </div>
        `;
        container.appendChild(card);
    });
})
.catch(err => console.error('Error fetching projects:', err));
