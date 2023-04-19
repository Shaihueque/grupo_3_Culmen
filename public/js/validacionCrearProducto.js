window.addEventListener("load", function(){
    /*ACA NOS TRAEMOS CADA UNO DE LOS ITEMS DEL FORMULARIO*/
    let formulario = document.querySelector("form.crearProducto")
    let nombreProducto= document.querySelector(".nombreProducto")
    let descripcion = document.querySelector(".descripcion")
    let img = document.querySelector("#img")
    let categorias = document.querySelector(".categorias")
    let prendas = document.querySelector(".prendas")
    let talles = document.querySelector(".talles")
    let precio = document.querySelector("#precio")

    let ulError = document.querySelector("div.errores ul");
    console.log(talles)

    /*ESTA ES LA VALIDACION DEL REGISTRO*/
   formulario.addEventListener("submit", function(b){

        let errores = [];
        

        if ((nombreProducto.value == "") || (nombreProducto.value.length < 5)) {
            errores.push("Debe elegir un nombre y debe contener al menos 5 caracteres")
        }
       if (descripcion.value.length < 20 ){
            errores.push("Debe elegir una descripcion y contener al menos 20 caracteres")
        }
        if (img.value == "") {
            errores.push("Debe elegir un imagen")  
        }

        if (prendas.value !== true) {
            errores.push("Debe seleccionar un tipo de prenda")  
        }
        if (talles.value !== true) {
            errores.push("Debe seleccionar un talle")  
        }
        if (precio.value == "") {
            errores.push("Debe elegir un precio")  
        }
        if (categorias.value == "") {
            errores.push("Debe seleccionar categoria y una marca")  
        }


     /*LOGICA PARA QUE NOS DEVUELVA LOS ERRORES */   
    if (errores.length>0) {
          b.preventDefault();

          ulError.innerHTML = "";
          
          for (let i = 0; i < errores.length; i ++){
            ulError.innerHTML += "<li>" + errores[i] + "</li>"
          }}
       
        })})

    



