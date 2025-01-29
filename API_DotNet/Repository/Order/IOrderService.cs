using API_DotNet.Models.Orders;
using API_DotNet.Repository.Customer.Dtos;
using API_DotNet.Repository.Order.Dtos;
using API_DotNet.Repository.User.Dtos;

namespace API_DotNet.Repository.Order
{
    public interface IOrderService
    {
        Task<List<OrdersOutput>> GetAll();
        Task<OrdersOutput> GetOrderByIdAsync(Guid orderId);
        Task<Orders> CreateOrderAsync(CreateOrderDto dto);
        Task DeleteOrderAsync(Guid orderId);

        Task<List<UserDTO>> GetAllUserForLookupTable(string filterText);
        Task<List<CustomerDTO>> GetAllCustomerForLookupTable(string filterText);
    }
}
