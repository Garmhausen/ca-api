import { check } from 'express-validator';
import { query } from '../resolvers';

const accountSignUpValidation = [
  check('name', 'Name must not be empty')
    .isString()
    .trim(),
  check('email')
    .isEmail()
    .withMessage('Email is not a valid email')
    .normalizeEmail()
    .custom(email => {
      return query.retrieveUserByEmail(email).then(user => {
        if (user) {
          return Promise.reject();
        }
      });
    })
    .withMessage('Email is already in use'),
  check('confirmPassword')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
  check('password', 'Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isLength({ max: 24 })
    .withMessage('Password maximum length is 24 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one symbol')
];

const resetPasswordValidation = [
  check('confirmPassword')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
  check('password', 'Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .isLength({ max: 24 })
    .withMessage('Password maximum length is 24 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one symbol')
]

export default {
  accountSignUpValidation,
  resetPasswordValidation
};
