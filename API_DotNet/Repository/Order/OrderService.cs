using API_DotNet.Infrastructures;
using API_DotNet.Models.Orders;
using API_DotNet.Repository.Order.Dtos;
using Microsoft.EntityFrameworkCore;

namespace API_DotNet.Repository.Order
{
    public class OrderService : IOrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<OrdersOutput>> GetAll()
        {
            var Orders = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.User)
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .ToListAsync();

            return Orders.Select(u => OrderMapper.ToDTO(u)).ToList();
        }

        public async Task<OrdersOutput> GetOrderByIdAsync(Guid orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Customer)
                .Include(o => o.User)
                .Include(o => o.OrderProducts)
                .ThenInclude(op => op.Product)
                .FirstOrDefaultAsync(o => o.Id == orderId);

            if (order is null) throw new Exception("Pedido não encontrado");

            return OrderMapper.ToDTO(order);
        }

        public async Task<Orders> CreateOrderAsync(CreateOrderDto dto)
        {
            var customer = await _context.Customers.FindAsync(dto.CustomerId);
            if (customer is null) throw new Exception("Cliente não encontrado");

            var user = await _context.Users.FindAsync(dto.UserId);
            if (user is null) throw new Exception("Usuário não encontrado");

            decimal total = 0;
            var orderProducts = new List<OrderProducts>();

            foreach (var productDto in dto.Products)
            {
                var product = await _context.Products.FindAsync(productDto.ProductId);
                if (product is null) throw new Exception("Produto não encontrado");

                var price = product.Preco * productDto.Quantity;
                total += price;

                orderProducts.Add(new OrderProducts
                {
                    ProductId = productDto.ProductId,
                    Quantity = productDto.Quantity,
                    Price = price
                });
            }

            var order = new Orders
            {
                CustomerId = dto.CustomerId,
                UserId = dto.UserId,
                Total = total,
                OrderProducts = orderProducts
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return order;
        }

        public async Task DeleteOrderAsync(Guid orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);

            if (order is null) throw new Exception("Pedido não encontrado");

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
        }
    }
}
