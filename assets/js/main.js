let menuBtn = document.getElementById("menuBtn");
let closeBtn = document.getElementById("closeMenu");
let nav = document.querySelector("nav");
const jsonURL = "./assets/projects.json";
const container = document.getElementById('projects-container');
const projectSection = document.getElementById("projects-section");
const modal = document.getElementById("projectModal");
const modalCard = document.getElementById("modalCard");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const liveBtn = document.getElementById("live_link");
const gitBtn = document.getElementById("git_link");

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
            card.className = 'card bg-white rounded-2xl border overflow-hidden';
            card.innerHTML = `
                <div class="image mb-2">
                    <img src="${project.image}" alt="${project.title}" class="w-full border-b"/>
                </div>
                <div class="title p-3 flex items-center justify-between mb-2 border-b">
                    <div class="left-side text-lg font-bold">${project.title}</div>
                    <div class="right-side flex">
                        <a href="${project.liveDemo}">
                            <div class="w-8 h-8 border rounded-full flex items-center justify-center mr-2">
                                <i class="hgi hgi-stroke hgi-view font-normal"></i>
                            </div>
                        </a>
                        <a href="${project.github}">
                            <div class="w-8 h-8 border rounded-full flex items-center justify-center">
                                <i class="hgi hgi-stroke hgi-github font-normal"></i>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="info p-3 text-gray-500">${project.description}</div>
            `;
            container.appendChild(card);
        });
})
.catch(err => console.error('Error fetching projects:', err));

fetch(jsonURL)
    .then(response => response.json())
    .then(projects => {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'card bg-white rounded-2xl border cursor-pointer overflow-hidden';
            card.innerHTML = `
                <div class="image mb-2">
                    <img src="${project.image}" alt="${project.title}" class="w-full border-b"/>
                </div>
                <div class="title p-3 flex items-center justify-between mb-2 border-b">
                    <div class="left-side text-lg font-bold">${project.title}</div>
                    <div class="right-side flex">
                        <a href="${project.liveDemo}">
                            <div class="w-8 h-8 border rounded-full flex items-center justify-center mr-2">
                                <i class="hgi hgi-stroke hgi-view font-normal"></i>
                            </div>
                        </a>
                        <a href="${project.github}">
                            <div class="w-8 h-8 border rounded-full flex items-center justify-center mr-2">
                                <i class="hgi hgi-stroke hgi-github font-normal"></i>
                            </div>
                        </a>
                        <p>
                            <div class="w-8 h-8 border rounded-full flex items-center justify-center cursor-pointer project-btn" data-id="${project.id}">
                                <i class="hgi hgi-stroke hgi-dashboard-circle font-normal"></i>
                            </div>
                        </p>
                    </div>
                </div>
                <div class="info p-3 text-gray-500">${project.description}</div>
            `;
            projectSection.appendChild(card);
        });
        projectSection.addEventListener("click", function (e) {
            const button = e.target.closest(".project-btn");
            if (!button) return;
            const projectId = button.dataset.id;
            const selectedProject = projects.find(p => p.id == projectId);
            openModal(selectedProject);
        });
})
.catch(err => console.error("Error:", err));

function openModal(project) {
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    liveBtn.href = project.liveDemo;
    gitBtn.href = project.github;
    modalTech.innerHTML = "";
    project.technologies.forEach(tech => {
        const span = document.createElement("span");
        span.className = "bg-lime-400 text-sm py-1 px-2 rounded-full text-black";
        span.textContent = tech;
        modalTech.appendChild(span);
    });
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    setTimeout(() => {
        modal.classList.remove("opacity-0");
        modalCard.classList.remove("scale-90");
        modalCard.classList.add("scale-100");
    }, 10);
    document.body.style.overflow = "hidden";
}

modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.classList.add("opacity-0");
        modalCard.classList.remove("scale-100");
        modalCard.classList.add("scale-90");
        setTimeout(() => {
            modal.classList.add("hidden");
            modal.classList.remove("flex");
        }, 300);
        document.body.style.overflow = "auto";
    }
});
