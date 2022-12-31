const express = require('express'); 
const path = require('path');
const app = express(); 
// PUERTO A UTILIZAR 
const PORT = 3030; 
// RUTAS PATH 
const homePath = path.join(__dirname , './views/home.html'); 
const publicPath = path.join(__dirname ,'/public');


app.use(express.static(publicPath)); 

app.listen(PORT , ()=>{
    console.log('Servidor corriendo ...')
});


app.get('/' , ( req, res )=>{
    res.sendFile(homePath)
} )

