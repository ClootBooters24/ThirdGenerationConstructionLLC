// Update the copyright year dynamically
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Initialize before/after sliders (only on gallery page)
if (document.querySelector('.comparison-slider')) {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const afterImage = slider.querySelector('.after-image');
        let isDragging = false;
        
        // Set initial position
        afterImage.style.width = '50%';
        handle.style.left = '50%';
        
        // Mouse events for desktop
        handle.addEventListener('mousedown', function(e) {
            isDragging = true;
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const sliderRect = slider.getBoundingClientRect();
            const offsetX = e.clientX - sliderRect.left;
            const percent = Math.min(Math.max(offsetX / sliderRect.width * 100, 0), 100);
            
            afterImage.style.width = percent + '%';
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
            
            afterImage.style.width = percent + '%';
            handle.style.left = percent + '%';
        });
        
        document.addEventListener('touchend', function() {
            isDragging = false;
        });
    });
}