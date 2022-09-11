const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const regExp = require('../utils/regExp');

const validationAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Некорректный id');
    }),
  }),
});

const validationUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExp),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const validationUserInfo = celebrate({
  body: {
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  },
});

const validationAvatar = celebrate({
  body: {
    avatar: Joi.string().required().pattern(regExp),
  },
});

const validationCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(regExp),
  }),
});

module.exports = {
  validationAuth,
  validationId,
  validationUser,
  validationUserInfo,
  validationAvatar,
  validationCard,
};
