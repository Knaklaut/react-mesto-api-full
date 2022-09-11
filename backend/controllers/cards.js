const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const { CREATED } = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ owner, name, link })
    .then((card) => res.status(CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const owner = req.user._id;
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан несуществующий id карточки.'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const owner = req.user._id;
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: owner } },
    { new: true },
  )
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан несуществующий id карточки.'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => new NotFoundError('Карточка не найдена.'))
    .then((card) => {
      if (!card.owner.equals(userId)) {
        return next(new ForbiddenError('Удаление карточки запрещено.'));
      }
      return Card.deleteOne(card)
        .then(() => res.send(card))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
