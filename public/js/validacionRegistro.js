window.addEventListener("load", function(){
    /*ACA NOS TRAEMOS CADA UNO DE LOS ITEMS DEL FORMULARIO*/
    let formulario = document.querySelector("form.registerform")
    let name= document.querySelector("#name")
    let lastname = document.querySelector("#lastname")
    let email = document.querySelector("#email")
    let pass = document.querySelector("#pass")
    let passConfirm = document.querySelector("#passConfirm")
    let userImage = document.querySelector("#userImage")

    /*ESTA ES LA VALIDACION DEL REGISTRO*/
    formulario.addEventListener("submit", function(e){

        let error = [];
        error.splice(0, error.length);

        if (name.value == "") {
            error.push("Debe elegir un nombre")
        }
       if (name.value.length < 2){
            error.push("El nombre debe contener al menos 3 caracteres")
        }
        
        if ((lastname == "") || (lastname.value.length <2 )) {
            error.push("Debe elegir un apellido y minimo 2 caracteres")  
        }
        
        if (email.value == "") {
            error.push("Debe elegir un email")
        }
        
        if(pass.value == "") {
            error.push("Debe elegir una contraseña")
        }
        /*
        CONTRASEÑA QUE CONTENGA MAYUSCULA Y DEMAS - VER BIEN
        else if (function validarContraseña(pass) {
            const regex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            return regex.test(pass);

          if (!validarContraseña(password)) {
            error.push("La contraseña debe contener 8 caracteres, una letra mayuscula y un numero");
          } }
        );
        /*if(passConfirm.value == "") {
            error.push("Debe confirmar la contraseña")
        } */
        if(passConfirm.value == pass.value) {
            error.push("La contraseña no coincide")
        }
        if (userImage.value == "") {
            error.push("Debe seleccionar una imagen")
        }

     /*LOGICA PARA QUE NOS DEVUELVA LOS ERRORES */   
    if (error.length>0) {
          e.preventDefault();
          
        }
        let ulError = document.querySelector("div.error ul");
          for (let i = 0; i < error.length; i ++){
            ulError.innerHTML += "<li>" + error[i] + "</li>"
          }

    })})

