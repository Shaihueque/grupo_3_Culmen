const express = require('express'); 
const path = require('path');
const app = express(); 
// PUERTO A UTILIZAR 
const PORT = 3030; 
// RUTAS PATH 
const publicPath = path.join(__dirname ,'/public');
/*
const homePath = path.join(__dirname , './views/home.html'); 
const producDetailPath = path.join(__dirname, './views/productDetail.html');
const carritoPath = path.join(__dirname, './views/carrito.html');
const loginPath = path.join(__dirname, './views/login.html'); */

// archivos de rutas 
const mainRoute =  require('./routes/mainRoute.js');  
const productDetailRoute =  require('./routes/productDetailRoute.js'); 
const carritoRoute =  require('./routes/carritoRoute.js'); 
const loginRoute =  require('./routes/loginRoute.js'); 

app.listen(PORT , ()=>{
    console.log('Servidor corriendo ...')
});


app.set('view engine', 'ejs'); 
app.set("views", path.join(__dirname, "views"));

app.use(express.static(publicPath)); 



app.use('/' , mainRoute );
app.use('/carrito' , carritoRoute);
app.use('/login' , loginRoute);
app.use('/productDetail' , productDetailRoute);

