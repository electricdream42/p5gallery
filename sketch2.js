// Geometric Patterns Sketch
const sketch2 = (p) => {
    let time = 0;
    let colorOffset = 0;
    let rotationSpeed = 0.005;
    let layers = 5;
    let shapesPerLayer = 8;
    let canvas;
    
    p.setup = function() {
        // Create canvas to fit the container
        let container = document.getElementById('sketch2');
        canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
        p.colorMode(p.HSB, 360, 100, 100, 1);
        p.rectMode(p.CENTER);
        p.ellipseMode(p.CENTER);
    };
    
    p.draw = function() {
        p.background(220, 10, 10, 0.1);
        p.translate(p.width / 2, p.height / 2);
        
        // Draw multiple layers of geometric patterns
        for (let layer = 0; layer < layers; layer++) {
            let layerSize = p.map(layer, 0, layers - 1, 50, p.min(p.width, p.height) * 0.8);
            let layerRotation = time * rotationSpeed * (layer % 2 === 0 ? 1 : -1);
            
            p.push();
            p.rotate(layerRotation);
            
            // Draw shapes for this layer
            for (let i = 0; i < shapesPerLayer; i++) {
                let angle = p.map(i, 0, shapesPerLayer, 0, p.TWO_PI);
                let x = p.cos(angle) * layerSize * 0.5;
                let y = p.sin(angle) * layerSize * 0.5;
                let hue = (colorOffset + layer * 30 + i * 10) % 360;
                
                p.push();
                p.translate(x, y);
                p.rotate(angle + time * 0.01);
                
                // Alternate between different shapes
                if (layer % 3 === 0) {
                    // Triangles
                    p.noFill();
                    p.stroke(hue, 80, 90, 0.8);
                    p.strokeWeight(2);
                    p.beginShape();
                    for (let j = 0; j < 3; j++) {
                        let a = p.map(j, 0, 3, 0, p.TWO_PI);
                        let sx = p.cos(a) * layerSize * 0.1;
                        let sy = p.sin(a) * layerSize * 0.1;
                        p.vertex(sx, sy);
                    }
                    p.endShape(p.CLOSE);
                } else if (layer % 3 === 1) {
                    // Rectangles
                    p.noFill();
                    p.stroke(hue, 80, 90, 0.8);
                    p.strokeWeight(2);
                    p.rect(0, 0, layerSize * 0.15, layerSize * 0.15);
                } else {
                    // Circles
                    p.noFill();
                    p.stroke(hue, 80, 90, 0.8);
                    p.strokeWeight(2);
                    p.ellipse(0, 0, layerSize * 0.15, layerSize * 0.15);
                }
                
                p.pop();
            }
            
            p.pop();
        }
        
        // Draw connecting lines between layers
        p.stroke(0, 0, 100, 0.2);
        p.strokeWeight(1);
        for (let i = 0; i < shapesPerLayer; i += 2) {
            let angle = p.map(i, 0, shapesPerLayer, 0, p.TWO_PI) + time * 0.01;
            let x1 = p.cos(angle) * 50;
            let y1 = p.sin(angle) * 50;
            let x2 = p.cos(angle) * p.min(p.width, p.height) * 0.4;
            let y2 = p.sin(angle) * p.min(p.width, p.height) * 0.4;
            p.line(x1, y1, x2, y2);
        }
        
        // Update time and color
        time += 1;
        colorOffset = (colorOffset + 0.2) % 360;
    };
    
    p.windowResized = function() {
        // Resize canvas when window is resized
        let container = document.getElementById('sketch2');
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };
    
    p.mousePressed = function() {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            // Change rotation speed and number of shapes on click
            rotationSpeed = p.random(0.002, 0.01);
            shapesPerLayer = p.floor(p.random(6, 12));
        }
    };
    
    p.mouseMoved = function() {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            // Adjust layers based on mouse position
            layers = p.floor(p.map(p.mouseX, 0, p.width, 3, 8));
        }
    };
};

// Initialize the sketch
const geometricPatternsSketch = createP5Instance(sketch2, 'sketch2'); 