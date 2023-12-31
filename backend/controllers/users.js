const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const checkErrorType = require('../utils/checkErrorType');
const NotFoundError = require('../utils/httpErrors/NotFound');
const AuthError = require('../utils/httpErrors/AuthError');
const DuplicateKeyError = require('../utils/httpErrors/DuplicateKeyError');

const notFoundErrorMessage = 'Запрашиваемый пользователь не найден';
const AuthErrorMessage = 'Неправильное имя пользователя или пароль';

const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { ...req.body } },
    { new: true, runValidators: true },
  )
    .then((result) => {
      if (!result) {
        throw new NotFoundError(notFoundErrorMessage);
      }
      res.status(200).send(result);
    })
    .catch((err) => {
      next(checkErrorType(err));
    });
};

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(checkErrorType(err));
    });
};

const getUserById = (req, res, next) => {
  const id = req.params.userId || req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundErrorMessage);
      }
      res.send(user);
    })
    .catch((err) => {
      next(checkErrorType(err));
    });
};

const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({ ...req.body, password: hash });
    return res.status(201).send(user);
  } catch (err) {
    if (err.code === 11000) {
      return next(
        new DuplicateKeyError('Пользователь с таким email уже существует'),
      );
    }
    return next(checkErrorType(err));
  }
};

const login = async (req, res, next) => {
  try {
    const { NODE_ENV, JWT_SECRET } = process.env;
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AuthError(AuthErrorMessage);
    }
    const isAuthorized = await bcrypt.compare(password, user.password);
    if (!isAuthorized) {
      throw new AuthError(AuthErrorMessage);
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      {
        expiresIn: '7d',
      },
    );

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
      .end();
  } catch (err) {
    next(checkErrorType(err));
  }
};

const logout = (_req, res, next) => {
  try {
    res
      .clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      })
      .end();
  } catch (err) {
    next(checkErrorType(err));
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  login,
  logout,
};
