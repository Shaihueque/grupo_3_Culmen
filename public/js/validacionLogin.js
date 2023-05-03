window.addEventListener("load", function () {
  /*ACA NOS TRAEMOS CADA UNO DE LOS ITEMS DEL FORMULARIO*/
  let formulario = document.querySelector("form.loginform")
  let emailLogin = document.querySelector("#emailLogin")
  let passLogin = document.querySelector("#passLogin")
  /*let db = require("../database/models")*/

  /*ESTA ES LA VALIDACION DEL REGISTRO*/
  
  let ulErrorLogin = document.querySelector("div.errorLogin ul");


  formulario.addEventListener("submit", function (a) {
   /* errorLogin = errorLogin.splice(0, array.length)*/
      let errorLogin = [];
      if (emailLogin.value == "") {
        errorLogin.push("Debe elegir un email")
      }


      if (passLogin.value == "") {
        errorLogin.push("Debe poner una contraseña")
      }

      if (errorLogin.length > 0) {
        a.preventDefault();

      ulErrorLogin.innerHTML = "";
      
      for (let i = 0; i < errorLogin.length; i++) {
        ulErrorLogin.innerHTML += "<li>" + errorLogin[i] + "</li>"
      }}

      formulario.submit(); 

  })
})
