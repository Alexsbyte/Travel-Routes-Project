const router = require('express').Router();
const authRoutes = require('./user.routes');
const routerRoutes = require('./api/router.routes');
const moderationRouter = require('./api/moderation.routes');
const commentRoutes = require('./comment.routes');
const favoriteRoutes = require('./favorite.routes');
const formatResponse = require('../utils/formatResponse');

router.use('/auth', authRoutes);
router.use('/routes', routerRoutes);
router.use('/moderations', moderationRouter);
router.use('/comments', commentRoutes);
router.use('/favorites', favoriteRoutes);

router.use('*', (req, res) => {
  res.status(404).json(formatResponse(404, 'Not found', null, 'Resource not found'));
});

module.exports = router;
