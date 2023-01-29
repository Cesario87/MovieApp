const express = require('express');
require('dotenv').config()
// const fetch = require('node-fetch')

// Middlewares modules:
const morgan = require('morgan')
const errorManager = require('./middlewares/errorManager')

// Routes modules:
// const searchRouter = require('./routes/searchRoutes')
const logSignRouter = require('./routes/logSignRoutes')

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views','./views');

// Routes:
app.use('/',logSignRouter);
// app.use('/search',searchRouter);

app.use(errorManager)

app.use(express.static('public'))

app.listen(PORT, () => {
    console.info(`> Traemos un montón de películas en el puerto ${PORT}!!! 🎥✨🎬`);
})