// Function to create project cards
function createProjectCard(project) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <div class="comparison-slider">
            <div class="image-container">
                <img class="before-image" src="${project.before}" alt="Before: ${project.title}">
                <div class="after-container">
                    <img class="after-image" src="${project.after}" alt="After: ${project.title}">
                </div>
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
        const afterContainer = slider.querySelector('.after-container');
        let isDragging = false;
        
        // Set initial position
        afterContainer.style.width = '50%';
        handle.style.left = '50%';
        
        // Mouse events
        handle.addEventListener('mousedown', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const sliderRect = slider.getBoundingClientRect();
            const offsetX = e.clientX - sliderRect.left;
            const percent = Math.min(Math.max(offsetX / sliderRect.width * 100, 0), 100);
            
            afterContainer.style.width = percent + '%';
            handle.style.left = percent + '%';
        });
        
        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
        
        // Touch events for mobile
        handle.addEventListener('touchstart', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            const sliderRect = slider.getBoundingClientRect();
            const touch = e.touches[0];
            const offsetX = touch.clientX - sliderRect.left;
            const percent = Math.min(Math.max(offsetX / sliderRect.width * 100, 0), 100);
            
            afterContainer.style.width = percent + '%';
            handle.style.left = percent + '%';
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
    });
}

// Generate project cards
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('project-container');
    container.innerHTML = '';
    
    projects.forEach(project => {
        container.appendChild(createProjectCard(project));
    });
    
    initializeSliders();
});