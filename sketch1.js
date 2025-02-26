// Particle Flow Sketch
const sketch1 = (p) => {
    let particles = [];
    const numParticles = 100;
    let hue = 0;
    let canvas;
    
    p.setup = function() {
        // Create canvas to fit the container
        let container = document.getElementById('sketch1');
        canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
        p.colorMode(p.HSB, 360, 100, 100, 1);
        
        // Initialize particles
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    };
    
    p.draw = function() {
        p.background(0, 0, 0, 0.1);
        
        // Update and display particles
        for (let particle of particles) {
            particle.update();
            particle.display();
        }
        
        // Slowly change the hue over time
        hue = (hue + 0.5) % 360;
    };
    
    p.windowResized = function() {
        // Resize canvas when window is resized
        let container = document.getElementById('sketch1');
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };
    
    p.mouseMoved = function() {
        // Add a new particle at mouse position when mouse is moved
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            particles.push(new Particle(p.mouseX, p.mouseY));
            // Remove oldest particle if we have too many
            if (particles.length > numParticles * 1.5) {
                particles.shift();
            }
        }
    };
    
    class Particle {
        constructor(x, y) {
            this.pos = p.createVector(x || p.random(p.width), y || p.random(p.height));
            this.vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
            this.acc = p.createVector(0, 0);
            this.size = p.random(3, 8);
            this.color = p.color(hue, p.random(50, 100), p.random(70, 100), 0.8);
            this.maxSpeed = p.random(1, 3);
            this.lifespan = 255;
        }
        
        update() {
            // Flow field effect - particles follow a perlin noise field
            let angle = p.noise(this.pos.x * 0.01, this.pos.y * 0.01, p.frameCount * 0.005) * p.TWO_PI * 2;
            let force = p.createVector(p.cos(angle), p.sin(angle));
            force.mult(0.1);
            
            // Add mouse attraction
            if (p.mouseIsPressed && p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
                let mouse = p.createVector(p.mouseX, p.mouseY);
                let dir = p.createVector(mouse.x - this.pos.x, mouse.y - this.pos.y);
                dir.normalize();
                dir.mult(0.5);
                force.add(dir);
            }
            
            this.acc.add(force);
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
            
            // Wrap around edges
            if (this.pos.x < 0) this.pos.x = p.width;
            if (this.pos.x > p.width) this.pos.x = 0;
            if (this.pos.y < 0) this.pos.y = p.height;
            if (this.pos.y > p.height) this.pos.y = 0;
            
            // Slowly fade out
            this.lifespan -= 0.5;
            if (this.lifespan < 0) {
                this.lifespan = 255;
                this.pos = p.createVector(p.random(p.width), p.random(p.height));
            }
        }
        
        display() {
            p.noStroke();
            let c = this.color;
            p.fill(p.hue(c), p.saturation(c), p.brightness(c), this.lifespan / 255);
            p.ellipse(this.pos.x, this.pos.y, this.size);
        }
    }
};

// Initialize the sketch
const particleFlowSketch = createP5Instance(sketch1, 'sketch1'); 