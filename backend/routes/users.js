const router = require('express').Router();
const {
  validationId,
  validationUserInfo,
  validationAvatar,
} = require('../middlewares/validityCheck');
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.patch('/me/avatar', validationAvatar, updateUserAvatar);
router.get('/me', getCurrentUser);
router.patch('/me', validationUserInfo, updateUserInfo);
router.get('/:id', validationId, getUser);
router.get('/', getUsers);

module.exports = router;
