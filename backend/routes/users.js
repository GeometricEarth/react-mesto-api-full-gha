const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { urlRegExp } = require('../utils/constants');

const {
  getAllUsers,
  getUserById,
  updateUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getUserById);
router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24).required(),
    }),
  }),
  getUserById,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      about: Joi.string().min(2).max(30).required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(urlRegExp).required(),
    }),
  }),
  updateUser,
);

module.exports = router;
