const Company = require('../../domain/Company');
const db = require('../../infra/db/connection');

class CompanyRepositoryMySQL {
  async getCompaniesWithTransfersLastMonth() {
    const sql = `
      SELECT DISTINCT e.* FROM empresas e
      JOIN transferencias t ON t.empresa_id = e.id
      WHERE t.fecha >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) {
          console.error('[ERROR] getCompaniesWithTransfersLastMonth:', err);
          return reject(err);
        }

        console.log('[DEBUG] Transferencias recientes:', results);
        const empresas = results.map(row => new Company(row));
        resolve(empresas);
      });
    });
  }

  async getCompaniesAdheredLastMonth() {
    const sql = `
      SELECT * FROM empresas
      WHERE fechaAdhesion >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) {
          console.error('[ERROR] getCompaniesAdheredLastMonth:', err);
          return reject(err);
        }

        console.log('[DEBUG] Empresas adheridas:', results);
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
