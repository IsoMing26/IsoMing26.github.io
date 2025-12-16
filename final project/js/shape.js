// Shape generation for Strata
// 4 wave layers that stack to fill the entire canvas

function generateShapes(width, height) {
    // Generate 3 wave lines that divide the canvas into 4 bands
    const waveLine1 = generateWaveLine(width, height * 0.25, 30 + Math.random() * 20);
    const waveLine2 = generateWaveLine(width, height * 0.5, 35 + Math.random() * 25);
    const waveLine3 = generateWaveLine(width, height * 0.75, 30 + Math.random() * 20);
    
    const shapes = [];
    
    // Layer 1: Top of canvas to wave 1
    shapes.push(createBand(width, height, null, waveLine1, 'top'));
    
    // Layer 2: Wave 1 to wave 2
    shapes.push(createBand(width, height, waveLine1, waveLine2, 'middle'));
    
    // Layer 3: Wave 2 to wave 3
    shapes.push(createBand(width, height, waveLine2, waveLine3, 'middle'));
    
    // Layer 4: Wave 3 to bottom of canvas
    shapes.push(createBand(width, height, waveLine3, null, 'bottom'));
    
    return shapes;
}

function generateWaveLine(width, baseY, amplitude) {
    const points = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * width;
        const y = baseY + Math.sin((i / steps) * Math.PI) * amplitude;
        points.push({ x, y });
    }
    
    return points;
}

function createBand(width, height, topWave, bottomWave, type) {
    let path = '';
    
    if (type === 'top') {
        // Start at top-left, go to top-right, then follow bottom wave right-to-left
        path = `M 0 0 L ${width} 0`;
        for (let i = bottomWave.length - 1; i >= 0; i--) {
            path += ` L ${bottomWave[i].x} ${bottomWave[i].y}`;
        }
        path += ' Z';
    } else if (type === 'bottom') {
        // Follow top wave left-to-right, then go to bottom-right, bottom-left
        path = `M ${topWave[0].x} ${topWave[0].y}`;
        for (let i = 1; i < topWave.length; i++) {
            path += ` L ${topWave[i].x} ${topWave[i].y}`;
        }
        path += ` L ${width} ${height} L 0 ${height} Z`;
    } else {
        // Middle band: follow top wave left-to-right, then bottom wave right-to-left
        path = `M ${topWave[0].x} ${topWave[0].y}`;
        for (let i = 1; i < topWave.length; i++) {
            path += ` L ${topWave[i].x} ${topWave[i].y}`;
        }
        for (let i = bottomWave.length - 1; i >= 0; i--) {
            path += ` L ${bottomWave[i].x} ${bottomWave[i].y}`;
        }
        path += ' Z';
    }
    
    return path;
}