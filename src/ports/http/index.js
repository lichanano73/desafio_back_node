const { Router } = require('express');
const router = Router();
const { verifyToken } = require('../../infra/middlewares/auth');

const auth_routes = require('./authRouter');
const company_routes = require('./companyRouter');

router.use('/empresas',company_routes);
router.use('/auth',auth_routes);

module.exports = router;