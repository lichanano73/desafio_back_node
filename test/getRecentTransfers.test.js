const getRecentTransfers = require('../src/app/usecases/getRecentTransfers');

describe('getRecentTransfers usecase', () => {
  it('Debe devolver lista de empresas con transferencias', async () => {

    const mockRepository = {
      getCompaniesWithTransfersLastMonth: jest.fn().mockResolvedValue([
        { cuit: '30-12345678-9', razonSocial: 'Empresa A', fechaAdhesion: '2024-03-01' },
        { cuit: '30-87654321-0', razonSocial: 'Empresa B', fechaAdhesion: '2024-03-10' }
      ])
    };

    const result = await getRecentTransfers(mockRepository);

    expect(result).toHaveLength(2);
    expect(mockRepository.getCompaniesWithTransfersLastMonth).toHaveBeenCalled();

  });

});
