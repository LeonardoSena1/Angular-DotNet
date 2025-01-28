using API_DotNet.Models.Orders;
using API_DotNet.Repository.Customer.Dtos;
using API_DotNet.Repository.User.Dtos;

namespace API_DotNet.Repository.Order.Dtos
{
    public class OrdersOutput
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public int CustomerId { get; set; }

        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public decimal Total { get; set; }

        public CustomerDTO Customer { get; set; }
        public UserDTO User { get; set; }
        public ICollection<OrderProducts> OrderProducts { get; set; }
    }
}
