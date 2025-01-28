using API_DotNet.Models.Customer;
using API_DotNet.Repository.Customer;
using API_DotNet.Repository.Customer.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public async Task<IEnumerable<CustomerDTO>> GetUsers() =>
            await _customerService.GetAll();


        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerDTO>> GetUser(int id) =>
             await _customerService.GetById(id);


        [HttpPost]
        public async Task CreateOrUpdate(Customers pro)
        {
            if (pro.Id is not null)
                await _customerService.Update(pro);
            else
                await _customerService.Create(pro);
        }


        [HttpDelete("{id}")]
        public async Task DeleteUser(int id) =>
             await _customerService.Delete(id);
    }
}
