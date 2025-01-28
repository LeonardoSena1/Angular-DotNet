using API_DotNet.Models.User;
using API_DotNet.Repository.User.Dtos;

namespace API_DotNet.Repository.User
{
    public interface IUsersService
    {
        Task<IEnumerable<UserDTO>> GetUsers();

        Task<UserDTO> GetUser(int id);

        Task Create(Users user);

        Task PutUser(Users user);

        Task DeleteUser(int id);
    }
}
