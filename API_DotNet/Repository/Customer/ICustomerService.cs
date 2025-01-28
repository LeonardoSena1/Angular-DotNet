using API_DotNet.Models.Customer;
using API_DotNet.Repository.Customer.Dtos;

namespace API_DotNet.Repository.Customer
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerDTO>> GetAll();
        Task<CustomerDTO> GetById(int id);
        Task Create(Customers prod);
        Task Update(Customers prod);
        Task Delete(int id);
    }
}
