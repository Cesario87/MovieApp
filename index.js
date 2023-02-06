const express = require('express');
const session = require('express-session');
require('dotenv').config()
const fetch = require('node-fetch')
const path = require('path');
const cookieParser = require("cookie-parser");
const protect = require('./middlewares/verifiedToken')



// Middlewares modules:
const morgan = require('morgan')
const errorManager = require('./middlewares/errorManager')
const bodyParser = require('body-parser');

// Routes modules:
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')
const adminRouter = require('./routes/adminRoutes')

const app = express();
const PORT = 3000;

app.use(express.json())
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'))
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes:
app.use('/admin', protect.adminProtector, adminRouter);
app.use('/u', protect.userProtectorAndRefresh, userRouter);
app.use('/', authRouter);

app.use(errorManager)

app.listen(PORT, () => {
    console.info(`> Traemos un montón de películas en el puerto ${PORT}!!! 🎥✨🎬`);
})