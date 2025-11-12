
document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("gear").addEventListener("click", function(){
           this.classList.toggle('active');
           document.body.classList.add('blur');
           console.log('clicked');
    });
    document.getElementById("toggle").addEventListener("click", function(){
           this.classList.toggle('active');
           document.body.classList.toggle('color');
           document.body.classList.remove('blur');
           console.log('clicked');
    });
    document.getElementById("button").addEventListener("click", function(){
           this.classList.toggle('active');
           document.body.classList.toggle('brightness');
           console.log('clicked');
    });




});

