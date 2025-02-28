const router = require('express').Router();
const authRoutes = require('./user.routes');
const routerRoutes = require('./api/router.routes');
const aiRouter = require('./api/ai.routes');
const commentRoutes = require('./comment.routes');
const profileRoutes = require('./api/profile.routes');
const favoriteRoutes = require('./favorite.routes');
const formatResponse = require('../utils/formatResponse');
const UserController = require('../controllers/User.controller');

router.use('/auth', authRoutes);
router.use('/routes', routerRoutes);
router.use('/ai', aiRouter);
router.use('/comments', commentRoutes);
router.use('/profiles', profileRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/verify-email/:token', UserController.verifyEmail);

router.use('*', (req, res) => {
  res.status(404).json(formatResponse(404, 'Not found', null, 'Resource not found'));
});

module.exports = router;
