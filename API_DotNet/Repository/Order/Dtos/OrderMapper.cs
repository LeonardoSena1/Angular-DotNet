using API_DotNet.Models.Orders;

namespace API_DotNet.Repository.Order.Dtos
{
    public static class OrderMapper
    {
        public static OrdersOutput ToDTO(Orders dto)
        {
            return new OrdersOutput
            {
                Id = dto.Id,
                Total = dto.Total,
                CreatedAt = dto.CreatedAt,
                UserId = dto.UserId,
                CustomerId = dto.CustomerId,
                OrderProducts = dto.OrderProducts,
                Customer = new Customer.Dtos.CustomerDTO()
                {
                    Id = dto.Customer.Id,
                    Cnpj = dto.Customer.Cnpj,
                    RazaoSocial = dto.Customer.RazaoSocial
                },
                User = new User.Dtos.UserDTO()
                {
                    Id = dto.User.Id,
                    CPF = dto.User.CPF,
                    Login = dto.User.Login,
                    NomeUsuario = dto.User.NomeUsuario
                },
            };
        }
    }
}
