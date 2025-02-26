// Main script to handle gallery interactions

document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        // Stagger the entrance animations
        setTimeout(() => {
            item.classList.add('in-view');
        }, 100 * index);
        
        // Add hover sound effect (subtle)
        item.addEventListener('mouseenter', () => {
            // You could add a subtle sound effect here if desired
            // For now, we'll just add a visual pulse effect
            const sketchContainer = item.querySelector('.sketch-container');
            sketchContainer.style.animation = 'pulse 1.5s';
            
            // Highlight effect
            item.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', () => {
            const sketchContainer = item.querySelector('.sketch-container');
            sketchContainer.style.animation = 'none';
            
            // Reset z-index
            item.style.zIndex = '1';
        });
    });
    
    // Add scroll reveal animations
    window.addEventListener('scroll', () => {
        galleryItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0);
            
            if (isVisible) {
                item.classList.add('in-view');
            }
        });
    });
    
    // Trigger initial scroll check
    window.dispatchEvent(new Event('scroll'));
    
    // Initialize all sketches
    initializeAllSketches();
});

// Helper function to create a P5 instance with the correct parent element
function createP5Instance(sketchFunction, parentId) {
    return new p5(sketchFunction, document.getElementById(parentId));
}

// Initialize all sketches
function initializeAllSketches() {
    // Make sure the sketch1 function is defined before initializing
    if (typeof sketch1 === 'function') {
        window.particleFlowSketch = createP5Instance(sketch1, 'sketch1');
    }
    
    // Make sure the sketch2 function is defined before initializing
    if (typeof sketch2 === 'function') {
        window.geometricPatternsSketch = createP5Instance(sketch2, 'sketch2');
    }
    
    // Make sure the sketch3 function is defined before initializing
    if (typeof sketch3 === 'function') {
        window.waveSimulationSketch = createP5Instance(sketch3, 'sketch3');
    }
    
    // Make sure the sketch4 function is defined before initializing
    if (typeof sketch4 === 'function') {
        window.fractalTreeSketch = createP5Instance(sketch4, 'sketch4');
    }
} 