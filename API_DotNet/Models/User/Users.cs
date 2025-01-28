using System.ComponentModel.DataAnnotations;

namespace API_DotNet.Models.User
{
    public class Users
    {
        public int? Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string NomeUsuario { get; set; }

        [Required]
        [MaxLength(11)]
        public string CPF { get; set; }

        [Required]
        [MaxLength(50)]
        public string Login { get; set; }

        [Required]
        [MaxLength(255)]
        public string Senha { get; set; }
    }
}
