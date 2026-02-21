// projects.js
// Builds additional project cards and paginates the projects grid.
document.addEventListener('DOMContentLoaded', function () {
    const projectsContainer = document.querySelector('.projects');
    if (!projectsContainer) return;

    const prevBtn = document.getElementById('projects-prev');
    const nextBtn = document.getElementById('projects-next');
    const pageInfo = document.getElementById('projects-page-info');
    const filterInputs = document.querySelectorAll('input[name="project-filter"]');

    const PROJECTS_PER_PAGE = 16;
    const EXTRA_PROJECT_COUNT = 84; // Existing 16 + 84 extra = ~100 total.

    const categoryCycle = ['gear', 'gear', 'sculpture', 'restoration'];

    function buildExtraProject(index) {
        const projectNumber = 17 + index;
        const fileIndex = String(index + 1).padStart(3, '0');
        const category = categoryCycle[index % categoryCycle.length];
        const year = 2019 + (index % 8);

        let subtype = 'Mechanical Study';
        let caption = `${year} - Brass, steel`;
        let desc = 'Clockwork study focused on balanced proportions, refined surface texture, and practical mechanical detail.';

        if (category === 'restoration') {
            subtype = 'Restoration Detail';
            caption = `${year} - Restoration`;
            desc = 'Restoration-focused build preserving patina while renewing movement, fittings, and structural integrity.';
        } else if (category === 'sculpture') {
            subtype = 'Sculpture Concept';
            caption = `${year} - Sculpture study`;
            desc = 'Sculptural concept blending industrial silhouette, engraved surfaces, and steampunk storytelling.';
        }

        return {
            title: `Project ${projectNumber}`,
            subtitle: subtype,
            category,
            src: `images/gallery-${fileIndex}.jpg`,
            alt: `Project ${projectNumber}`,
            caption,
            desc,
            meta: caption
        };
    }

    function createProjectCard(data) {
        const card = document.createElement('div');
        card.className = `project ${data.category}`;
        card.setAttribute('data-desc', data.desc);
        card.setAttribute('data-caption', data.caption);

        card.innerHTML = [
            '<picture>',
            `  <img src="${data.src}" alt="${data.alt}" loading="lazy" decoding="async">`,
            '</picture>',
            `<p>${data.title}<br>${data.subtitle}</p>`,
            `<span class="project-meta">${data.meta}</span>`
        ].join('');

        return card;
    }

    // Append extra projects after the existing 16 cards.
    for (let i = 0; i < EXTRA_PROJECT_COUNT; i += 1) {
        const project = buildExtraProject(i);
        projectsContainer.appendChild(createProjectCard(project));
    }

    const allProjects = Array.from(projectsContainer.querySelectorAll('.project'));
    let currentPage = 1;

    const filterMap = {
        'filter-all': 'all',
        'filter-gears': 'gear',
        'filter-restoration': 'restoration',
        'filter-sculpture': 'sculpture'
    };

    function getActiveFilter() {
        const checked = Array.from(filterInputs).find((input) => input.checked);
        return checked ? (filterMap[checked.id] || 'all') : 'all';
    }

    function getFilteredProjects() {
        const activeFilter = getActiveFilter();
        if (activeFilter === 'all') return allProjects;
        return allProjects.filter((project) => project.classList.contains(activeFilter));
    }

    function updatePagination() {
        const filteredProjects = getFilteredProjects();
        const totalPages = Math.max(1, Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE));

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
        const endIndex = startIndex + PROJECTS_PER_PAGE;
        const currentPageItems = new Set(filteredProjects.slice(startIndex, endIndex));

        allProjects.forEach((project) => {
            project.style.display = currentPageItems.has(project) ? '' : 'none';
        });

        if (pageInfo) {
            pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        }

        if (prevBtn) {
            prevBtn.disabled = currentPage <= 1;
        }
        if (nextBtn) {
            nextBtn.disabled = currentPage >= totalPages;
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            currentPage -= 1;
            updatePagination();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentPage += 1;
            updatePagination();
        });
    }

    filterInputs.forEach((input) => {
        input.addEventListener('change', function () {
            currentPage = 1;
            updatePagination();
        });
    });

    updatePagination();
});
