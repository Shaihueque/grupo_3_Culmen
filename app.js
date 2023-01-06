const express = require('express'); 
const path = require('path');
const app = express(); 
// PUERTO A UTILIZAR 
const PORT = 3030; 
// RUTAS PATH 
const publicPath = path.join(__dirname ,'/public');
const homePath = path.join(__dirname , './views/home.html'); 
const producDetailPath = path.join(__dirname, './views/productDetail.html');
const carritoPath = path.join(__dirname, './views/carrito.html');



app.use(express.static(publicPath)); 

app.listen(PORT , ()=>{
    console.log('Servidor corriendo ...')
});


app.get('/' , ( req, res )=>{
    res.sendFile(homePath)
} );
app.get('/productDetail' , ( req, res )=>{
    res.sendFile(producDetailPath)
} );
app.get('/carrito' , ( req, res )=>{
    res.sendFile(carritoPath)
} );

app.get('/login' , ( req, res )=>{
    res.sendFile(carritoPath)
} );

