const fs = require('fs'); 
const path = require('path'); 

const UserModels = {
    fileName: './data/userData.json',

    getData:function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        /*if(lastUser) {
            return lastUser.id + 1;
        }
        return1;*/
        let newId = lastUser ? lastUser.id + 1 : 1 
        return newId 
    },

    findAll: function() {
        return this.getData();
    },

    // Buscar un usuario a travez del ID
    findByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    //Traer un usuario por Email- field = a la columna deseada(email, pais, etc) - text = dato que buscamos(xxx@gmail.com, Argentina, etc).
    findByField: function(field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function (userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    delete: function() {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    },

}

module.exports = UserModels;