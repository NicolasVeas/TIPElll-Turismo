
var overlay = document.getElementById('overlay')
var popup = document.getElementById('popup');
var btnCerrarPopup = document.getElementById('btn-cerrar-popup');
var elem = document.getElementsByClassName("btnpop");

btnCerrarPopup.addEventListener('click', function(e){
	e.preventDefault();
	overlay.classList.remove('active');
	popup.classList.remove('active');
});

for (var i = 0; i < elem.length; i++) {
    (function () {
        console.log(elem[i]);
        elem[i].addEventListener("click", function() {
			overlay.classList.add('active'),
			popup.classList.add('active');
		}, false);
    }()); 
}

// pasar el volor nombre categoria al popup

function cambiarboton(nombre_cat){
    var i=document.getElementById("nombre-actual").value = nombre_cat;
}
