const express = require('express'); 
const path = require('path');
const app = express(); 
// PUERTO A UTILIZAR 
const PORT = 3030; 
// RUTAS PATH 
const indexPath = path.join(__dirname , './views/index.html'); 
const publicPath = path.join(__dirname ,'/public');


app.use(express.static(publicPath)); 

app.listen(PORT , ()=>{
    console.log('Servidor corriendo ...')
});


app.get('/' , ( req, res )=>{
    res.sendFile(indexPath)
} )

