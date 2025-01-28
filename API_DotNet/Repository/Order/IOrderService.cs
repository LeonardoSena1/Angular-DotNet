using API_DotNet.Models.Orders;
using API_DotNet.Repository.Order.Dtos;

namespace API_DotNet.Repository.Order
{
    public interface IOrderService
    {
        Task<List<OrdersOutput>> GetAll();
        Task<OrdersOutput> GetOrderByIdAsync(Guid orderId);
        Task<Orders> CreateOrderAsync(CreateOrderDto dto);
        Task DeleteOrderAsync(Guid orderId);
    }
}
