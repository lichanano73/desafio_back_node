module.exports = async (repository, limit, offset, orderBy, orderDir) => {
    return await repository.getCompaniesWithTransfersLastMonth(limit, offset, orderBy, orderDir);
};