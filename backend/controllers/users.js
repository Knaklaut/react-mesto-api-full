const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictingError = require('../errors/ConflictingError');
const { CREATED } = require('../utils/constants');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => new NotFoundError('Такого пользователя не существует.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный идентификатор пользователя.'));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => new NotFoundError('Такого пользователя не существует.'))
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(CREATED).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictingError('Пользователь с таким email существуетю'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('Такого пользователя не существует.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Передан некорректный идентификатор пользователя.'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => new NotFoundError('Такого пользователя не существует.'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const tokenGen = (payload, term) => jwt.sign(payload, 'some-secret-key', { expiresIn: term });

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError('Пользователь не существует.');
      }
      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        throw new AuthError('Не правильный email или пароль.');
      }
      return tokenGen({ _id: user._id }, '7d');
    })
    .then((token) => {
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  getUsers,
  getCurrentUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
};
