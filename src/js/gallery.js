// Function to create project cards
function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <div class="comparison-slider">
            <div class="slider-container">
                <img class="before-image" src="${project.before}" alt="Before: ${project.title}">
                <img class="after-image" src="${project.after}" alt="After: ${project.title}">
                <div class="slider-handle"></div>
                <div class="before-label">Before</div>
                <div class="after-label">After</div>
            </div>
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    return projectCard;
}

// Function to initialize sliders
function initializeSliders() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const beforeImage = slider.querySelector('.before-image');
        let isDragging = false;

        // Helper to update slider
        function updateSlider(clientX) {
            const sliderRect = slider.getBoundingClientRect();
            const offsetX = clientX - sliderRect.left;
            const percent = Math.min(Math.max(offsetX / sliderRect.width * 100, 0), 100);
            beforeImage.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
            handle.style.left = `${percent}%`;
        }

        // Mouse events
        handle.addEventListener('mousedown', function(e) {
            isDragging = true;
            e.preventDefault();

            function onMouseMove(e) {
                if (!isDragging) return;
                updateSlider(e.clientX);
            }
            function onMouseUp() {
                isDragging = false;
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            }
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
        });

        // Touch events
        handle.addEventListener('touchstart', function(e) {
            isDragging = true;
            e.preventDefault();

            function onTouchMove(e) {
                if (!isDragging) return;
                const touch = e.touches[0];
                updateSlider(touch.clientX);
            }
            function onTouchEnd() {
                isDragging = false;
                window.removeEventListener('touchmove', onTouchMove);
                window.removeEventListener('touchend', onTouchEnd);
            }
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        });

        // Set initial position
        handle.style.left = '50%';
        beforeImage.style.clipPath = `polygon(0 0, 50% 0, 50% 100%, 0 100%)`;
    });
}

// Load projects from JSON file
document.addEventListener('DOMContentLoaded', function() {
    // Only run on gallery page
    if (!document.querySelector('.gallery-header')) return;
    
    fetch('projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('project-container');
            container.innerHTML = '';
            
            projects.forEach(project => {
                container.appendChild(createProjectCard(project));
            });
            
            initializeSliders();
        })
        .catch(error => {
            console.error('Error loading projects:', error);
            const container = document.getElementById('project-container');
            container.innerHTML = `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Could not load projects. Please try again later.</p>
                </div>
            `;
        });
});