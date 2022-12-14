const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => validator.isURL(link),
      message: 'Некорректная ссылка',
    },
  },
  email: {
    type: String,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Некорректный email',
    },
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
