var counter = 1;
setInterval(function () {
    document.getElementById('i' + counter).checked = true;
    counter++;
    if (counter > 5) {
        counter = 1;
    }
}, 2500);


