const express = require('express');
const router  = express.Router();
const company_controller = require('../../adapters/controllers/companyController');

router.get('/transferencias-recientes', company_controller.getRecentTransfers);
router.get('/adhesiones-recientes', company_controller.getRecentCompanies);
router.post('/adhesion', company_controller.addCompany);

module.exports = router;