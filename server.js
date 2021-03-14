'user strict'
const jsApp = require('./public/js/app.js');
const fs = require('fs');

const express = require('express');
const app = express();
const PORT = 4000;


app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',renderHomePage);

const pgOne = require('./public/data/page-1.json');
const pgTwo = require('./public/data/page-2.json');
function renderHomePage(req,res){
    const animals = createAnimalList(pgOne);
    ejsObj = {animals:animals};    
    res.render('index.ejs',ejsObj);
}


function Animal(image_url,title,description,keyword,horns){
    this.image_url = image_url,
    this.title = title,
    this.description = description,
    this.keyword = keyword,
    this.horns = horns
}

const createAnimalList = jsOnObject =>{
    return jsOnObject.map(animal =>{
        return new Animal(
            animal.image_url,
            animal.title,
            animal.description,
            animal.keyword,
            animal.horns
        )
    })
}

app.listen(PORT,()=>{console.log(`Listening on http://localhost:${PORT}`)})