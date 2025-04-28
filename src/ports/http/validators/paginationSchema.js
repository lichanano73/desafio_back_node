const { z } = require('zod');

const paginationSchema = (allowedFields) => z.object({
  limit: z.string().optional().transform(val => val ? Number(val) : 50)
    .refine(val => Number.isInteger(val) && val > 0 && val <= 100, {
      message: 'Limit debe estar entre 1 y 100',
  }),

  offset: z.string().optional().transform(val => val ? Number(val) : 0)
    .refine(val => Number.isInteger(val) && val >= 0, {
      message: 'Offset debe ser mayor o igual a 0',
  }),

  orderBy: z.string().optional()
    .refine(val => allowedFields.includes(val || allowedFields[0]), {
      message: 'Campo de orden inválido',
  }).default(allowedFields[0]),

  orderDir: z.string().optional().transform(val => (val || '').toUpperCase())
    .refine(val => ['ASC', 'DESC'].includes(val), {
      message: 'Dirección de orden inválida',
  }).default('DESC')

});
  


module.exports = { paginationSchema };
