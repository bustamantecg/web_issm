function limpiarErrores() {
    console.log("Entro en la validacion")
    // var errores = document.getElementsByClassName("error");
    var errores = document.getElementsByClassName("text-danger");
    for (var i = 0; i < errores.length; i++) {
        errores[i].innerHTML = "";
    }
}

function validar(formulario) {
    limpiarErrores();


    if (formulario.contrasena.value.trim().length < 7) {
        document.getElementById("errorContrasena").innerText = "Contraseña inválida (Mínimo 6 caracteres)";
        formulario.contrasena.focus();
        return false;
    }

    if (formulario.contrasena.value != formulario.clavenuevarepite.value) {
        document.getElementById("errorConfirmacion").innerText = "Confirmación no coincide";
        formulario.confirmacion.focus();
        return false;
    }


    if (confirm('¿Estas seguro de Cambiar Su Clave de Acceso al Sistema?')) {
        alert("Felicitaciones!!!.  Gracias.");
        document.formulario.submit();
    } else {
        alert("Clave No Actualizada");
    }
}

