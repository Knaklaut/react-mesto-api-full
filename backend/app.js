require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const { validationAuth, validationUser } = require('./middlewares/validityCheck');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { generalProcessor, notFoundProcessor } = require('./middlewares/errProcessor');
const createUser = require('./routes/newUserRouter');
const login = require('./routes/login');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use('/signin', validationAuth, login);
app.use('/signup', validationUser, createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use(notFoundProcessor);
app.use(errorLogger);
app.use(errors());
app.use(generalProcessor);

app.listen(PORT);
