// Wave Simulation Sketch
const sketch3 = (p) => {
    let waves = [];
    let numWaves = 5;
    let time = 0;
    let colorScheme = [
        [0, 255, 255],    // Cyan
        [255, 0, 255],    // Magenta
        [255, 255, 0]     // Yellow
    ];
    let canvas;
    
    p.setup = function() {
        // Create canvas to fit the container
        let container = document.getElementById('sketch3');
        canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
        
        // Initialize waves with different properties
        for (let i = 0; i < numWaves; i++) {
            waves.push({
                amplitude: p.random(20, 50),
                period: p.random(100, 300),
                phase: p.random(0, p.TWO_PI),
                color: colorScheme[i % colorScheme.length],
                thickness: p.random(1, 3)
            });
        }
    };
    
    p.draw = function() {
        p.background(0, 20);
        
        // Draw each wave
        for (let waveIndex = 0; waveIndex < waves.length; waveIndex++) {
            let wave = waves[waveIndex];
            
            p.stroke(wave.color[0], wave.color[1], wave.color[2], 150);
            p.strokeWeight(wave.thickness);
            p.noFill();
            
            // Draw the wave as a continuous line
            p.beginShape();
            for (let x = 0; x < p.width; x += 5) {
                // Calculate y position based on sine wave formula
                let y = p.height / 2 + 
                        wave.amplitude * p.sin((x / wave.period) * p.TWO_PI + wave.phase + time) +
                        wave.amplitude * 0.5 * p.sin((x / (wave.period * 0.5)) * p.TWO_PI + wave.phase * 1.5 + time * 1.3);
                
                // Add vertex to the shape
                p.vertex(x, y);
                
                // Draw additional particles along the wave for visual effect
                if (x % 30 === 0 && p.random() > 0.7) {
                    p.push();
                    p.noStroke();
                    p.fill(wave.color[0], wave.color[1], wave.color[2], 200);
                    p.ellipse(x, y, p.random(3, 6));
                    p.pop();
                }
            }
            p.endShape();
        }
        
        // Draw interactive elements
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            // Draw ripple effect at mouse position
            p.noFill();
            for (let i = 0; i < 3; i++) {
                let rippleSize = (time * 5 + i * 20) % 100;
                let alpha = p.map(rippleSize, 0, 100, 200, 0);
                p.stroke(255, alpha);
                p.strokeWeight(2);
                p.ellipse(p.mouseX, p.mouseY, rippleSize, rippleSize * 0.8);
            }
            
            // Draw connecting lines between mouse and wave points
            if (p.mouseIsPressed) {
                p.stroke(255, 100);
                p.strokeWeight(1);
                for (let x = 0; x < p.width; x += 50) {
                    for (let waveIndex = 0; waveIndex < waves.length; waveIndex++) {
                        let wave = waves[waveIndex];
                        let y = p.height / 2 + 
                                wave.amplitude * p.sin((x / wave.period) * p.TWO_PI + wave.phase + time);
                        
                        // Draw line from mouse to wave point
                        p.line(p.mouseX, p.mouseY, x, y);
                    }
                }
            }
        }
        
        // Update time
        time += 0.05;
    };
    
    p.windowResized = function() {
        // Resize canvas when window is resized
        let container = document.getElementById('sketch3');
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };
    
    p.mousePressed = function() {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            // Add a new wave on mouse press
            if (waves.length < 8) {
                waves.push({
                    amplitude: p.random(20, 50),
                    period: p.random(100, 300),
                    phase: p.random(0, p.TWO_PI),
                    color: [p.random(100, 255), p.random(100, 255), p.random(100, 255)],
                    thickness: p.random(1, 3)
                });
            }
        }
    };
    
    p.mouseDragged = function() {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            // Modify wave properties based on mouse drag
            for (let wave of waves) {
                wave.amplitude = p.map(p.mouseY, 0, p.height, 10, 80);
                wave.phase += 0.1;
            }
        }
    };
};

// Initialize the sketch
const waveSimulationSketch = createP5Instance(sketch3, 'sketch3'); 