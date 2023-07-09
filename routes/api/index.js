const router = require('express').Router();
const userRoutes = require('./user-routes');
const toughtRoutes = require ('./thought-routes');

router.use('/users', userRoutes);
router.use('/thoughts', toughtRoutes);

module.exports = router; 