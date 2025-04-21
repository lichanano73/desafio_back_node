const Company  = require('../../domain/Company');

module.exports = async (repository, data) => {
    const company = new Company(data);
    return await repository.addCompany(company);
};
