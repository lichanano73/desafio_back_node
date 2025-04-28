const getRecentCompanies = require('../src/app/usecases/getRecentCompanies');

describe('getRecentCompanies usecase', () => {
  it('Debe devolver lista de empresas adheridas', async () => {
    
    const mockRepository = {
      getCompaniesAdheredLastMonth: jest.fn().mockResolvedValue([
        { cuit: '30-112233445', razonSocial: 'Empresa C', fechaAdhesion: '2024-04-01' },
        { cuit: '30-556677889', razonSocial: 'Empresa D', fechaAdhesion: '2024-04-15' }
      ])
    };

    const result = await getRecentCompanies(mockRepository);

    expect(result).toHaveLength(2);
    expect(mockRepository.getCompaniesAdheredLastMonth).toHaveBeenCalled();
    
  });
});
