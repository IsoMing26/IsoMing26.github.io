document.addEventListener("DOMContentLoaded", (event) => {
    
    for( var i=0; i<=49; i++){
        var div = document.createElement('div')
        div.className = 'square';
        if(i % 2 ===0){
            div.style.backgroundColor = '#98A191';
        } else {
            div.style.backgroundColor = '#EECB86';
        }
        document.getElementById('container').appendChild(div);

    }
});
