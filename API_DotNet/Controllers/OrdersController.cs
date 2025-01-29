using API_DotNet.Attribute;
using API_DotNet.Repository.Customer.Dtos;
using API_DotNet.Repository.Order;
using API_DotNet.Repository.Order.Dtos;
using API_DotNet.Repository.User.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiKey]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<List<OrdersOutput>> GetAll()
        {
            var response = await _orderService.GetAll();

            return response;
        }


        [HttpGet("{id}")]
        public async Task<OrdersOutput> GetOrderById(Guid id) =>
             await _orderService.GetOrderByIdAsync(id);


        [HttpPost]
        public async Task CreateOrUpdate(CreateOrderDto dto) =>
            await _orderService.CreateOrderAsync(dto);


        [HttpDelete("{id}")]
        public async Task Delete(Guid id) =>
            await _orderService.DeleteOrderAsync(id);

        [HttpGet("GetAllUserForLookupTable")]
        public async Task<List<UserDTO>> GetAllUserForLookupTable(string filterText)
        {
            var response = await _orderService.GetAllUserForLookupTable(filterText);

            return response;
        }

        [HttpGet("GetAllCustomerForLookupTable")]
        public async Task<List<CustomerDTO>> GetAllCustomerForLookupTable(string filterText)
        {
            var response = await _orderService.GetAllCustomerForLookupTable(filterText);

            return response;
        }
    }
}
