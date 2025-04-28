const { companySchema }    = require('../../ports/http/validators/companySchema');
const { paginationSchema } = require('../../ports/http/validators/paginationSchema');

const getRecentTransfers = require('../../app/usecases/getRecentTransfers');
const getRecentCompanies = require('../../app/usecases/getRecentCompanies');
const addCompany = require('../../app/usecases/addCompany');

let repository;
exports.setRepository = (repo) => {
  repository = repo;
};

exports.getRecentTransfers = async (req, res) => {
    try {

        const parse = paginationSchema.safeParse(req.query);
        if (!parse.success) {
          return res.status(400).json({ error: parse.error.format() });
        }
        
        const { limit, offset, orderBy, orderDir } = parse.data;

        console.log(`limit ${limit} - offset ${offset} - orderBy ${orderBy} - orderDir ${orderDir}`)
    
        const result = await getRecentTransfers(repository, limit, offset, orderBy, orderDir);
        return res.status(200).json(result);
        
    } catch (error) {
        console.error('[ERROR] getRecentTransfers:', error);
        return res.status(500).json({ error: 'Error al obtener transferencias recientes' });
    }
};

exports.getRecentCompanies = async (req, res) => {
    try {

        const parse = paginationSchema.safeParse(req.query);
        if (!parse.success) {
            return res.status(400).json({ error: parse.error.format() });
        }

        const { limit, offset, orderBy, orderDir } = parse.data;
        
        const result = await getRecentCompanies(repository, limit, offset, orderBy, orderDir);
        return res.status(200).json(result);

    } catch (error) {
        console.error('[ERROR] getRecentCompanies:', error);
        return res.status(500).json({ error: 'Error al obtener empresas adheridas' });
    }
};

exports.addCompany = async (req, res) => {
    try {

        const data_parse = companySchema.safeParse(req.body);

        if (!data_parse.success) {
            return res.status(400).json({ error: data_parse.error.format() });
        }

        const result = await addCompany(repository, req.body);
        return res.status(201).json({ id: result });

    } catch (error) {
        console.error('[ERROR] addCompany:', error);
        return res.status(500).json({ error: error.sqlMessage });
    }
};