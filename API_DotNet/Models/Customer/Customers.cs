using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_DotNet.Models.Customer
{
    [Table("Customer")]
    public class Customers
    {
        public int? Id { get; set; }

        [Required]
        [MaxLength(14)]
        public string Cnpj { get; set; }

        [Required]
        [MaxLength(150)]
        public string RazaoSocial { get; set; }
    }
}
