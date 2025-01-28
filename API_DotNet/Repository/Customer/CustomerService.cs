using API_DotNet.Infrastructures;
using API_DotNet.Models.Customer;
using API_DotNet.Repository.Customer.Dtos;
using Microsoft.EntityFrameworkCore;

namespace API_DotNet.Repository.Customer
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _context;

        public CustomerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CustomerDTO>> GetAll()
        {
            var customers = await _context.Customers.ToListAsync();
            var customerDTOs = customers.Select(u => CustomerMapper.ToDTO(u)).ToList();
            return customerDTOs;
        }

        public async Task<CustomerDTO> GetById(int id)
        {
            var prod = await _context.Customers.FindAsync(id);

            if (prod is null)
                return new CustomerDTO();

            var prodDTO = CustomerMapper.ToDTO(prod);
            return prodDTO;
        }

        public async Task Create(Customers prod)
        {
            _context.Customers.Add(prod);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Customers prod)
        {
            var existingProd = await _context.Customers.FindAsync(prod.Id);

            if (existingProd is null)
                throw new Exception("Cliente não encontrado.");

            existingProd.Cnpj = prod.Cnpj;
            existingProd.RazaoSocial = prod.RazaoSocial;

            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var prod = await _context.Customers.FindAsync(id);

            if (prod is null)
                return;

            _context.Customers.Remove(prod);
            await _context.SaveChangesAsync();
        }
    }
}
