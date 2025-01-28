using API_DotNet.Repository.Order;
using API_DotNet.Repository.Order.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        public async Task DeleteUser(Guid id) =>
            await _orderService.DeleteOrderAsync(id);

    }
}
