const router = require('express').Router();
const { userProfileValidation } = require('../middlewares/validation');
const {
  getCurrentUser,
  updateUserProfile,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', userProfileValidation, updateUserProfile);

module.exports = router;
