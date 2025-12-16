const grid = document.querySelector('.gallery_grid');
const savedCollages = JSON.parse(localStorage.getItem('strata_collages') || '[]');

// Sample images (always shown first)
const samples = [
    'asset/sample/sample1.jpg',
    'asset/sample/sample2.jpg',
    'asset/sample/sample3.jpg',
    'asset/sample/sample4.jpg'
];

const totalSlots = 10;
let selectedSlot = null;

for (let i = 0; i < totalSlots; i++) {
    const slot = document.createElement('div');
    slot.className = 'gallery_item';
    
    if (i < samples.length) {
        // Show sample images first
        const img = document.createElement('img');
        img.src = samples[i];
        img.alt = 'Sample ' + (i + 1);
        slot.appendChild(img);
        slot.dataset.imageSrc = samples[i];
        slot.dataset.type = 'sample';
    } else if (i - samples.length < savedCollages.length) {
        // Then show user collages
        const img = document.createElement('img');
        img.src = savedCollages[i - samples.length].image;
        img.alt = 'Collage ' + (i - samples.length + 1);
        slot.appendChild(img);
        slot.dataset.imageSrc = savedCollages[i - samples.length].image;
        slot.dataset.type = 'collage';
    }
    
    // Click to select
    slot.addEventListener('click', function() {
        if (!this.dataset.imageSrc) return; // Empty slot
        
        // Deselect previous
        if (selectedSlot) {
            selectedSlot.classList.remove('selected');
        }
        
        // Select this one
        this.classList.add('selected');
        selectedSlot = this;
    });
    
    grid.appendChild(slot);
}

// Download button functionality
document.querySelector('.download_button').addEventListener('click', function() {
    if (!selectedSlot || !selectedSlot.dataset.imageSrc) {
        alert('Please select an image to download');
        return;
    }
    
    const imageSrc = selectedSlot.dataset.imageSrc;
    const link = document.createElement('a');
    link.download = 'strata_' + new Date().toISOString().slice(0, 10) + '_' + Date.now() + '.png';
    
    // For sample images (external files), we need to fetch and convert
    if (selectedSlot.dataset.type === 'sample') {
        // Create a canvas to convert the image
        const img = selectedSlot.querySelector('img');
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        link.href = canvas.toDataURL('image/png');
    } else {
        // User collages are already base64
        link.href = imageSrc;
    }
    
    link.click();
});