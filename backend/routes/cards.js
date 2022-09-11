const router = require('express').Router();
const {
  validationId,
  validationCard,
} = require('../middlewares/validityCheck');
const {
  getCards,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

router.put('/:id/likes', validationId, likeCard);
router.delete('/:id/likes', validationId, dislikeCard);
router.delete('/:id', validationId, deleteCard);
router.get('/', getCards);
router.post('/', validationCard, createCard);

module.exports = router;
