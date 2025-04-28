module.exports = async (repository, limit, offset, orderBy, orderDir) => {
    return await repository.getCompaniesAdheredLastMonth(limit, offset, orderBy, orderDir);
};