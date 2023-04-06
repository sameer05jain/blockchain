const express = require("express");
const hbs = require('hbs');
const path = require("path");
const app = express();
const session = require('express-session');

hbs.registerPartials(path.join(__dirname, './src/views/partials'));
app.use(express.static('src'))
const port = process.env.PORT || 6969;

app.use(session({
	secret: 'marthandam damdererere',
	resave: true,
	saveUninitialized: true
}));

app.set('view engine', 'hbs');
app.set('views', './src/views')

app.get('/', (request, response) => {
    response.render('index', {});
  });
app.get('/login', (request, response) => {
    response.render('login', {});
  });

app.listen(port);
console.log('Server started at http://localhost:' + port);
