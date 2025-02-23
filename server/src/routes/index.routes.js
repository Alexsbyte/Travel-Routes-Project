const router = require('express').Router();
const authRoutes = require('./user.routes');
const routerRoutes = require('./router.routes');
const uploadRouter = require('./api/uploads.routes');
const pointRouter = require('./point.routes')

const formatResponse = require('../utils/formatResponse');

router.use('/auth', authRoutes);
router.use('/uploads', uploadRouter);
router.use('/routes', routerRoutes);
router.use('/points' , pointRouter)

router.use('*', (req, res) => {
  res.status(404).json(formatResponse(404, 'Not found', null, 'Resource not found'));
});

module.exports = router;
