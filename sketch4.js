// Fractal Tree Sketch
const sketch4 = (p) => {
    let angle = p.PI / 4;
    let initialLength = 100;
    let lengthRatio = 0.67;
    let minLength = 5;
    let maxDepth = 10;
    let windEffect = 0;
    let leafColor;
    let branchColor;
    let backgroundColor;
    let growthFactor = 0;
    let growing = true;
    let canvas;
    
    p.setup = function() {
        // Create canvas to fit the container
        let container = document.getElementById('sketch4');
        canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
        p.colorMode(p.HSB, 360, 100, 100, 1);
        
        // Initialize colors
        leafColor = p.color(120, 80, 80);
        branchColor = p.color(30, 80, 40);
        backgroundColor = p.color(210, 30, 10);
        
        // Set frame rate
        p.frameRate(30);
    };
    
    p.draw = function() {
        p.background(p.hue(backgroundColor), p.saturation(backgroundColor), p.brightness(backgroundColor), 0.1);
        
        // Draw the tree
        p.translate(p.width / 2, p.height);
        
        // Apply wind effect
        windEffect = p.map(p.noise(p.frameCount * 0.01), 0, 1, -0.1, 0.1);
        
        // Draw the tree recursively
        drawBranch(initialLength * growthFactor, 0);
        
        // Update growth
        if (growing) {
            growthFactor += 0.01;
            if (growthFactor >= 1) {
                growthFactor = 1;
                growing = false;
            }
        }
    };
    
    function drawBranch(len, depth) {
        // Draw the branch
        p.strokeWeight(p.map(len, 0, initialLength, 1, 5));
        p.stroke(p.lerpColor(leafColor, branchColor, p.map(len, 0, initialLength, 0, 1)));
        p.line(0, 0, 0, -len);
        
        // Move to the end of the branch
        p.translate(0, -len);
        
        // If the branch is long enough, draw two new branches
        if (len > minLength && depth < maxDepth) {
            // Right branch
            p.push();
            p.rotate(angle + windEffect);
            drawBranch(len * lengthRatio, depth + 1);
            p.pop();
            
            // Left branch
            p.push();
            p.rotate(-angle + windEffect);
            drawBranch(len * lengthRatio, depth + 1);
            p.pop();
            
            // Middle branch (sometimes)
            if (depth < 2 || p.random() > 0.7) {
                p.push();
                p.rotate(windEffect * 2);
                drawBranch(len * lengthRatio * 0.8, depth + 1);
                p.pop();
            }
        } else if (len <= minLength) {
            // Draw leaves at the end of branches
            p.noStroke();
            
            // Vary leaf color slightly
            let leafHue = (p.hue(leafColor) + p.random(-20, 20)) % 360;
            let leafSat = p.saturation(leafColor) + p.random(-10, 10);
            let leafBri = p.brightness(leafColor) + p.random(-10, 10);
            
            p.fill(leafHue, leafSat, leafBri, 0.8);
            
            // Draw a leaf (ellipse)
            p.ellipse(0, 0, 8, 8);
            
            // Sometimes add a flower
            if (p.random() > 0.8) {
                p.fill((leafHue + 180) % 360, 80, 90, 0.9);
                p.ellipse(0, 0, 5, 5);
            }
        }
    }
    
    p.windowResized = function() {
        // Resize canvas when window is resized
        let container = document.getElementById('sketch4');
        p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };
    
    p.mousePressed = function() {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            // Reset the tree with new parameters
            angle = p.map(p.mouseX, 0, p.width, p.PI/6, p.PI/3);
            lengthRatio = p.map(p.mouseY, 0, p.height, 0.5, 0.8);
            
            // Change colors
            leafColor = p.color(p.random(60, 180), 80, 80);
            branchColor = p.color(p.random(20, 40), 80, 40);
            
            // Restart growth
            growthFactor = 0.1;
            growing = true;
        }
    };
    
    p.mouseMoved = function() {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
            // Adjust wind effect based on mouse position
            windEffect = p.map(p.mouseX, 0, p.width, -0.2, 0.2);
        }
    };
};

// Initialize the sketch
const fractalTreeSketch = createP5Instance(sketch4, 'sketch4'); 