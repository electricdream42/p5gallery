// Matrix Digital Rain Background
const matrixRain = (() => {
    let canvas;
    let ctx;
    let characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    let fontSize = 14;
    let columns;
    let drops = [];
    let frameCount = 0;

    // Convert the string to an array of characters
    characters = characters.split('');

    function initialize() {
        // Create canvas element
        canvas = document.createElement('canvas');
        canvas.id = 'matrix-rain';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-2'; // Lower z-index to be behind everything
        canvas.style.opacity = '1'; // Full opacity
        canvas.style.pointerEvents = 'none';
        document.body.prepend(canvas);

        ctx = canvas.getContext('2d');
        
        // Set canvas size
        resizeCanvas();
        
        // Initialize drops
        initDrops();
        
        // Start animation
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            initDrops();
        });
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
    }
    
    function initDrops() {
        drops = [];
        for (let i = 0; i < columns; i++) {
            // Initialize with random y positions
            drops[i] = Math.random() * -100;
        }
    }
    
    function animate() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set text color and font
        ctx.fillStyle = '#0F0'; // Bright green
        ctx.font = fontSize + 'px monospace';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Select a random character
            const char = characters[Math.floor(Math.random() * characters.length)];
            
            // Draw the character
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Vary the color for a more cyberpunk feel
            if (Math.random() > 0.98) {
                ctx.fillStyle = `hsl(${Math.random() * 60 + 120}, 100%, 60%)`;
            } else if (Math.random() > 0.95) {
                ctx.fillStyle = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`;
            } else {
                // Vary the brightness of green
                const brightness = Math.floor(Math.random() * 30) + 40;
                ctx.fillStyle = `rgba(0, ${brightness + 150}, ${brightness}, 0.9)`;
            }
            
            ctx.fillText(char, x, y);
            
            // Reset drop position if it's at the bottom or randomly
            if (y > canvas.height || Math.random() > 0.995) {
                drops[i] = 0;
            }
            
            // Move drop down
            drops[i]++;
        }
        
        frameCount++;
        requestAnimationFrame(animate);
    }
    
    return {
        init: initialize
    };
})();

// Initialize the matrix rain effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    matrixRain.init();
}); 