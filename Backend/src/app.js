const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const config = require('config');

const errorHandler = require('./middlewares/error-handler.middleware')

const userRouter = require('./routers/user.routers');
const booksRouter = require('./routers/books.routers');

const { notFound } = require('./utils/response.utils') 

const PRODUCTION = config.get('production');

const app = express();

const whitelist = []
const corsOptions = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1){
            callback(null, true);
        }
        else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}
app.use('/uploads', express.static(path.join(__dirname,'..', 'uploads')));

app.use(cors(PRODUCTION && corsOptions))
app.use(express.json())
app.use(helmet())

app.get('/', async (_, res) => res.send('Node.js server'));

app.use('/', userRouter)
app.use('/', booksRouter);

app.all('*', async (req, res) => notFound(res));
app.use(errorHandler)
module.exports = app;