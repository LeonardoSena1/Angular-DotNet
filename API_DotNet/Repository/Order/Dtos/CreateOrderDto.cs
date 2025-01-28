namespace API_DotNet.Repository.Order.Dtos
{
    public class CreateOrderDto
    {
        public int CustomerId { get; set; }
        public int UserId { get; set; }
        public List<OrderProductDto> Products { get; set; }
    }
}
