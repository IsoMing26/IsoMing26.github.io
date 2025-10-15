document.addEventListener("DOMContentLoaded", (event) => {
    for ( var i = 0; i<=25; i++){
        var div = document.createElement('div')
        div.className = 'scale';

        var size = 20 + (i * 2)
        div.style.width = size + 'px';
        div.style.height = size + 'px';

        document.getElementById('container').appendChild(div);
    }
});