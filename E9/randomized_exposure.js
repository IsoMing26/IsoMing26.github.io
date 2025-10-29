document.addEventListener("DOMContentLoaded", (event) => {
     

     let blur = [0, 2, 4, 8, 12, 18];
     let brightness = [0.4, 0.6, 0.9, 1.2, 1.5, 1.9];

     let images = document.querySelectorAll('.image');
     images.forEach((img) => {

          let dice_blur = Math.floor(Math.random() * 6) + 1;
          console.log(dice_blur);
          let blurNum = blur[dice_blur - 1];
          console.log(blurNum);

          let dice_brightness = Math.floor(Math.random() * 6) + 1;
          console.log(dice_brightness);
          let brightnessNum = brightness[dice_brightness - 1];
          console.log(brightnessNum);

          img.style.filter = `blur(${blurNum}px) brightness(${brightnessNum})`;

     })


 
});