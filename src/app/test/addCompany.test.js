// test/usecases/addCompany.test.js

const addCompany = require('../usecases/addCompany');

describe('addCompany usecase', () => {
  it('Debe agregar una empresa correctamente', async () => {
    const mockRepository = {
      addCompany: jest.fn().mockResolvedValue(1)
    };

    const newCompany = {
      cuit: '30-12345678-9',
      razonSocial: 'Empresa Test Unitario',
      fechaAdhesion: '2024-04-20'
    };

    const result = await addCompany(mockRepository, newCompany);

    expect(result).toBe(1);
    expect(mockRepository.addCompany).toHaveBeenCalledWith(expect.objectContaining(newCompany));


  });
});