const { z } = require('zod');

const companySchema = z.object({
    cuit:           z.string().regex(/^\d{2}-\d{8}-\d{1}$/, 'CUIT inválido. Formato esperado: 30-12345678-9'),
    razonSocial:    z.string().min(3, 'Razón social requerida'),
    fechaAdhesion:  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato YYYY-MM-DD')
});

module.exports = { companySchema };