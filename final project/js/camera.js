// Get elements
const video = document.getElementById('camera_feed');
const overlay = document.getElementById('overlay');
const ctx = overlay.getContext('2d');
const shutterButton = document.querySelector('.shutter_button');

// State
let shapes = [];
let currentLayer = 0;
let captures = [];
let startTime = null;

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
        video.onloadedmetadata = function() {
            overlay.width = overlay.offsetWidth;
            overlay.height = overlay.offsetHeight;
            
            shapes = generateShapes(overlay.width, overlay.height);
            drawOverlay();
        };
    })
    .catch(function(error) {
        console.log('Camera error:', error);
    });

function drawOverlay() {
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    
    // Block out everything except current shape
    if (currentLayer < 4) {
        ctx.fillStyle = '#ffffffff';
        ctx.fillRect(0, 0, overlay.width, overlay.height);
        
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fill(new Path2D(shapes[currentLayer]));
        ctx.restore();
    }
    
    // Draw captured layers (greyed out) ON TOP of the mask
    for (let i = 0; i < captures.length; i++) {
        ctx.save();
        ctx.clip(new Path2D(captures[i].shape));
        ctx.filter = 'grayscale(100%) opacity(60%)';
        ctx.drawImage(captures[i].image, 0, 0);
        ctx.restore();
    }
}

// Capture on shutter click
shutterButton.addEventListener('click', function() {
    if (currentLayer >= 4) return;
    
    // Start timer on first capture
    if (currentLayer === 0) {
        startTime = new Date();
    }
    
    // Create a temporary canvas to capture the frame
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = overlay.width;
    tempCanvas.height = overlay.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Draw the video frame
    tempCtx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
    
    // Store the capture with its shape
    captures.push({
        image: tempCanvas,
        shape: shapes[currentLayer]
    });
    
    // Move to next layer
    currentLayer++;
    
    // Update progress indicator
    document.querySelector('.progress_indicator').textContent = (currentLayer + 1) + '/4';
    
    // Check if done
    if (currentLayer >= 4) {
        showCompletion();
    } else {
        drawOverlay();
    }
});

function showCompletion() {
    // Hide camera view, show completion
    document.querySelector('.main_container').style.display = 'none';
    document.querySelector('.completion_screen').style.display = 'flex';
    
    // Calculate elapsed time
    const endTime = new Date();
    const elapsed = endTime - startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.querySelector('.time_elapsed').textContent = 'Time: ' + timeString;
    
    // Draw final composite
    drawFinalComposite();
    saveCollage();
}

function drawFinalComposite() {
    const canvas = document.getElementById('final_composite');
    const fctx = canvas.getContext('2d');
    
    // Match the overlay dimensions exactly
    canvas.width = overlay.width;
    canvas.height = overlay.height;
    
    // Draw each captured layer in order
    for (let i = 0; i < captures.length; i++) {
        fctx.save();
        fctx.clip(new Path2D(captures[i].shape));
        fctx.drawImage(captures[i].image, 0, 0);
        fctx.restore();
    }
}

function saveCollage() {
    const canvas = document.getElementById('final_composite');
    const imageData = canvas.toDataURL('image/png');
    
    // Get existing collages
    const collages = JSON.parse(localStorage.getItem('strata_collages') || '[]');
    
    // Add new collage
    collages.push({
        image: imageData,
        time: document.querySelector('.time_elapsed').textContent,
        date: new Date().toISOString()
    });
    
    // Save back to localStorage
    localStorage.setItem('strata_collages', JSON.stringify(collages));
}

// Download button functionality
document.querySelector('.download_button').addEventListener('click', function() {
    const canvas = document.getElementById('final_composite');
    const imageData = canvas.toDataURL('image/png');
    
    // Create a download link
    const link = document.createElement('a');
    link.download = 'strata_' + new Date().toISOString().slice(0, 10) + '_' + Date.now() + '.png';
    link.href = imageData;
    
    // Trigger the download
    link.click();
});