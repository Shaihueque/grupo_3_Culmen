
window.onload = ()=>{
  const formCreateProd = document.getElementById("formCreateProd");
  const nombre = document.getElementById("nombre");
  const descripcion = document.getElementById("descripcion");
  const file_img = document.getElementById("file_img");
  const files_img = document.getElementById("files_img");
  const category = document.getElementById("category");
  const marca = document.getElementById("marca");
  const precio = document.getElementById("precio");
  const btn_crear_prod = document.getElementById("btn_crear_prod");
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

  nombre.focus();

    //---------------- FUNCION PARA ERROR ------------------
    const isError = (field, errorElement, text) => {
        field.classList.remove("isValid");
        field.classList.add("isInvalid");
        if (!errorElement) {
        field.parentNode.insertAdjacentHTML(
            "beforeend",
            `<small class="msg-invalid"><br />${text}</small>`
        );
        }else{
            errorElement.remove();
            field.parentNode.insertAdjacentHTML(
                "beforeend",
                `<small class="msg-invalid"><br />${text}</small>`
            );
        }
    };

    // ----------FUNCION PARA OK ------------------
    const isOk = (field, errorElement) => {
        field.classList.add("isValid");
        field.classList.remove("isInvalid");
        if (errorElement) {
        errorElement.remove();
        }
        if (field.parentNode.nextElementSibling.classList.contains('errors')) {
            console.log(field.parentNode.nextElementSibling)
            field.parentNode.nextElementSibling.style.display='none'
        }
        btn_crear_prod.removeAttribute('disabled')
    };

  /*************  VALIDATION ON-TIME CREATE PRODUCT ***************/
  formCreateProd.addEventListener("input", (e) => {
    e.preventDefault();
    const field = e.target;
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    let errorElement = field.parentNode.querySelector(".msg-invalid");
    let imagenNo = 0 ;
    if (field.parentNode.nextElementSibling.classList.contains('errors')) {
        field.parentNode.nextElementSibling.style.display='none'
    }

    if ( validator.isEmpty(fieldValue) ) {
        isError(field, errorElement, `El campo ${fieldName} no puede estar vacío`);
    } else if( fieldValue && (fieldName == 'nombre') && ( !validator.isLength(fieldValue, {min: 5}) )) {
        isError(field, errorElement , `Este campo debe tener al menos 5 caracteres`);
    }else if( fieldValue && (fieldName == 'descripcion') && ( !validator.isLength(fieldValue, {min: 20}) )) {
        isError(field, errorElement , `Este campo debe tener al menos 20 caracteres`);
    }else if ( fieldValue && (fieldName == 'file_img' && !validator.isIn(field.files[0].name.split('.').pop(). toLowerCase(), allowedExtensions)) ){
        isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`)
    }else if ( fieldValue && (fieldName == 'precio') && (!validator.isNumeric(fieldValue)) ) {
        isError(field, errorElement , `El valor ingresado debe ser númerico`)
    }else if ( fieldValue && (fieldName == 'files_img' ) && Array.from(field.files).length > 4) { 
        isError(field, errorElement, 'No puedes subir más de 4 archivos');
    }else if (fieldValue && (fieldName == 'files_img' ) && (Array.from(field.files).length <= 4 && Array.from(field.files).length > 0 )) {
        const files = Array.from(field.files);
        files.forEach( file => {
            const extension = file.name.split('.').pop().toLowerCase();
            if (!validator.isIn(extension, allowedExtensions)) {
                imagenNo++
                //fieldValue = ''; 
            }
        })
        imagenNo > 0 ? isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`) : isOk(field , errorElement)     
    }else {
        isOk(field , errorElement)
    }



});

/***************  VALIDATION ON-SUBMIT CREATE PRODUCT  *******************/
     formCreateProd.addEventListener('submit', e => {

        e.preventDefault(); 
        let isValid = true;
        const formElements = formCreateProd.querySelectorAll('input:not([type="radio"]), select, textarea');

        formElements.forEach((field) => {
          const fieldValue = field.value;
          const fieldName = field.name;
          let errorElement = field.parentNode.querySelector(".msg-invalid");
          let imagenNo = 0;

          if ( validator.isEmpty(fieldValue) ) {
            isValid = false;
            isError(field, errorElement, `El campo ${fieldName} no puede estar vacío`);
        } else if( fieldValue && (fieldName == 'nombre') && ( !validator.isLength(fieldValue, {min: 5}) )) {
            isValid = false;
            isError(field, errorElement , `Este campo debe tener al menos 5 caracteres`);
        }else if( fieldValue && (fieldName == 'descripcion') && ( !validator.isLength(fieldValue, {min: 20}) )) {
            isValid = false;
            isError(field, errorElement , `Este campo debe tener al menos 20 caracteres`);
        }else if ( fieldValue && (fieldName == 'file_img' && !validator.isIn(field.files[0].name.split('.').pop(). toLowerCase(), allowedExtensions)) ){
            isValid = false;
            isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`)
        }else if ( fieldValue && (fieldName == 'precio') && (!validator.isNumeric(fieldValue)) ) {
            isValid = false;
            isError(field, errorElement , `El valor ingresado debe ser númerico`)
        }else if ( fieldValue && (fieldName == 'files_img' ) && Array.from(field.files).length > 4) { 
            isValid = false;
            isError(field, errorElement, 'No puedes subir más de 4 archivos');
        }else if (fieldValue && (fieldName == 'files_img' ) && (Array.from(field.files).length <= 4 && Array.from(field.files).length > 0 )) {
            const files = Array.from(field.files);
            files.forEach( file => {
                const extension = file.name.split('.').pop().toLowerCase();
                if (!validator.isIn(extension, allowedExtensions)) {
                    imagenNo++
                }
            })
            imagenNo > 0 ? isError(field, errorElement, `El formato de tu imagen debe ser .jpg, .png, .jpeg o .gif`) : isOk(field , errorElement)     
        }else {
            isValid = true;
            isOk(field , errorElement)
        }
        });

        const radiosTipo = document.querySelectorAll('input[type="radio"][name="tipo"]');
        const radiosTalle = document.querySelectorAll('input[type="radio"][name="talle"]');
        let isCheckedTipo = false;
        let isCheckedTalle = false;
        let errorElementTipo = radiosTipo[0].parentNode.querySelector(".msg-invalid");
        let errorElementTalle = radiosTipo[0].parentNode.querySelector(".msg-invalid");

        radiosTipo.forEach((radio) => {
          if (radio.checked) {
            isCheckedTipo = true;
          }
        });

        if (!isCheckedTipo) {
            isError(radiosTipo[0], errorElementTipo, `esta campo no puede estar vacio` )
        }else{
            isOk(radiosTipo , errorElementTipo)
        }

        radiosTalle.forEach((radio) => {
          if (radio.checked) {
            isCheckedTalle = true;
          }
        });
        if (!isCheckedTalle) {
            isError(radiosTalle[0], errorElementTalle, `esta campo no puede estar vacio` )
        }else{
            isOk(radiosTalle, errorElementTalle)
        }

        !isValid ? e.preventDefault() : formCreateProd.submit();




        
    })
}