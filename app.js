const express = require('express'); 
const path = require('path');
const app = express(); 
// PUERTO A UTILIZAR 
const PORT = 3030; 
// RUTAS PATH 
const publicPath = path.join(__dirname ,'/public');

/************ REQUIRE DE RUTAS  **************/ 
const mainRoute =  require('./routes/mainRoute.js');  
const productsRoute = require('./routes/productsRoute');
const carritoRoute =  require('./routes/carritoRoute.js'); 
const loginRoute =  require('./routes/loginRoute'); 

/********** CAPTURAR INFO DE POST *************/
app.use(express.urlencoded( { extended:false } ));
app.use(express.json());

/********* CONFIGURANDO EL METODO OVERRIDE  ************/
const methodOverride = require('method-override'); 
app.use(methodOverride('_method')); 

/**********  ESCUCHANDO EL PUERTO   *********/
app.listen(PORT , ()=>{
    console.log('Servidor corriendo ...')
});

/*********  SETEANDO LAS VISTAS PARA TRABAJAR CON EJS ***********/
app.set('view engine', 'ejs'); 
app.set("views", path.join(__dirname, "views"));

/********** CONFIGURANDO LA CARPETA PUBLIC  ***********/
app.use(express.static(publicPath)); 

/********** USE DE RUTAS PRINCIPALES *************/

app.use('/' , mainRoute );
app.use('/products' , productsRoute)
app.use('/carrito' , carritoRoute);
app.use('/login' , loginRoute);



