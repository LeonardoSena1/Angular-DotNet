using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API_DotNet.Models.Product
{
    [Table("Products")]
    public class Products
    {
        public int? Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string NomeProduto { get; set; }

        [Required]
        public decimal Preco { get; set; }
    }
}
