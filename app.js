const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));



// Add the route handlers here:
// index (main page route)
app.get('/', (req, res) => {
  res.render('index');
});


// beers route
app.get('/beers', (req, res) => {
  punkAPI.getBeers().then(beersFromApi => {
    res.render('beers', {beers: beersFromApi})
    console.log(beersFromApi)
  })
});



// random beers route
app.get('/randombeer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    res.render('randombeer', {random: responseFromAPI})
  })
  .catch(error => console.log(error));
})













app.listen(3001, () => console.log('🏃‍ on port 3001'));
