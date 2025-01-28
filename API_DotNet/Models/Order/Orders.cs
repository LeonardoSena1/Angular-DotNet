using API_DotNet.Models.Customer;
using API_DotNet.Models.User;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_DotNet.Models.Orders
{
    [Table("Order")]
    public class Orders
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public decimal Total { get; set; }

        public Customers Customer { get; set; }
        public Users User { get; set; }
        public ICollection<OrderProducts> OrderProducts { get; set; }
    }
}
