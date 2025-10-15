document.addEventListener("DOMContentLoaded", (event) => {
    var i = 0
    while(i <=49){
        document.getElementById('pattern').textContent += ''

        if(i % 3 === 0){
             document.getElementById('pattern').textContent += '.'
        } else {
             document.getElementById('pattern').textContent += '。'
        }
         i++;
    }
});