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
