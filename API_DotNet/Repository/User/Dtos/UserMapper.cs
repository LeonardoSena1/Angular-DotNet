using API_DotNet.Models.User;

namespace API_DotNet.Repository.User.Dtos
{
    public static class UserMapper
    {
        public static UserDTO ToDTO(Users user)
        {
            return new UserDTO
            {
                Id = user.Id,
                NomeUsuario = user.NomeUsuario,
                CPF = user.CPF,
                Login = user.Login
            };
        }
    }
}
