'user strict'
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get('/',renderHomePage);

const pgOne = require('./public/data/page-1.json');
const pgTwo = require('./public/data/page-2.json');
function renderHomePage(req,res){
    if(req._parsedOriginalUrl.path === '/' )
    {
        res.redirect('/?page=1&animal=all');
    }
    else
    {
        const animals = createAnimalList(pgOne,'1').concat(createAnimalList(pgTwo,'2'));
        const animalNames = getAnimalNames(createAnimalList(pgOne,'1').concat(createAnimalList(pgTwo,'2')));
        const filteredAnimals = filterAnimals(animals,req);
        const ejsObj = {animals:{animals,filteredAnimals,animalNames}};  
        res.render('index.ejs',ejsObj);
    }
}


function Animal(image_url,title,description,keyword,horns,page){
    this.image_url = image_url,
    this.title = title,
    this.description = description,
    this.keyword = keyword,
    this.horns = horns
    this.page = page
}

const createAnimalList = (jsonObject,page) =>{
    return jsonObject.map(animal =>{
        return new Animal(
            animal.image_url,
            animal.title,
            animal.description,
            animal.keyword,
            animal.horns,
            page
        )
    })
}

const filterAnimals = (animalList,req) =>{
    return animalList.filter(animal =>{
        const selectedAll = req.query.animal === 'all';
        const animalsOnPage = animal.page === req.query.page;
        const selectedSpecificAnimal = animal.keyword.toLowerCase() === req.query.animal ;
        return selectedAll ? animalsOnPage : selectedSpecificAnimal;
    })
}

const getAnimalNames = animalList =>{
    const animalNames = [];
    animalList.map(animal => {
        if(!animalNames.includes(animal.keyword))
        {
            animalNames.push(animal.keyword); 
        }
    })
    return animalNames;
}

app.listen(PORT,()=>{console.log(`Listening on http://localhost:${PORT}`)})