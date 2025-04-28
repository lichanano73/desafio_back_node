const Company = require('../../domain/Company');
const db = require('../../infra/db/connection');

class CompanyRepositoryMySQL {

  async getCompaniesWithTransfersLastMonth(limit = 50, offset = 0, orderBy = 't.fecha', orderDir = 'DESC') {
    const allowedFields = ['t.fecha', 'e.razonSocial', 'e.cuit', 'e.fechaAdhesion'];
    const allowedDirections = ['ASC', 'DESC'];
  
    // Validar campos
    if (!allowedFields.includes(orderBy)) {
      orderBy = 't.fecha';
    }
  
    if (!allowedDirections.includes(orderDir.toUpperCase())) {
      orderDir = 'DESC';
    }
  
    const sql = `
      SELECT DISTINCT e.*, t.fecha
      FROM empresas e
      JOIN transferencias t ON t.empresa_id = e.id
      WHERE t.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
      ORDER BY ${orderBy} ${orderDir}
      LIMIT ? OFFSET ?
    `;
  
    return new Promise((resolve, reject) => {
      db.query(sql, [limit, offset], (err, results) => {
        if (err) {
          console.error('[ERROR] getCompaniesWithTransfersLastMonth:', err);
          return reject(err);
        }
        const empresas = results.map(row => new Company(row));
        resolve(empresas);
      });
    });
  }
  
  

  async getCompaniesAdheredLastMonth(limit = 50, offset = 0, orderBy = 'e.fechaAdhesion', orderDir = 'DESC') {
    const allowedFields = ['e.fechaAdhesion', 'e.razonSocial', 'e.cuit'];
    const allowedDirections = ['ASC', 'DESC'];
  
    // Validar campos
    if (!allowedFields.includes(orderBy)) {
      orderBy = 'e.fechaAdhesion';
    }
  
    if (!allowedDirections.includes(orderDir.toUpperCase())) {
      orderDir = 'DESC';
    }
  
    const sql = `
      SELECT *
      FROM empresas e
      WHERE fechaAdhesion >= DATE_SUB( NOW(), INTERVAL 1 MONTH)
      ORDER BY ${orderBy} ${orderDir}
      LIMIT ? OFFSET ?
    `;
  
    return new Promise((resolve, reject) => {
      db.query(sql, [limit, offset], (err, results) => {
        if (err) {
          console.error('[ERROR] getCompaniesAdheredLastMonth:', err);
          return reject(err);
        }
        const empresas = results.map(row => new Company(row));
        resolve(empresas);
      });
    });
  }
  

  async addCompany(company) {
    const { cuit, razonSocial, fechaAdhesion } = company;

    const sql = `
      INSERT INTO empresas (cuit, razonSocial, fechaAdhesion)
      VALUES (?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [cuit, razonSocial, fechaAdhesion], (err, result) => {
        if (err) {
          console.error('[ERROR] addCompany:', err);
          return reject(err);
        }

        console.log('[DEBUG] Add Empresa:', result);
        resolve(result);
      });
    });
    
  }
}

module.exports = CompanyRepositoryMySQL;
