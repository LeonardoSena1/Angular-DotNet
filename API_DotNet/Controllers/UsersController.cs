using API_DotNet.Attribute;
using API_DotNet.Models.User;
using API_DotNet.Repository.User;
using API_DotNet.Repository.User.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [ApiKey]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet]
        public async Task<IEnumerable<UserDTO>> GetUsers() =>
             await _usersService.GetUsers();


        [HttpGet("{id}")]
        
        public async Task<ActionResult<UserDTO>> GetUser(int id) =>
             await _usersService.GetUser(id);


        [HttpPost]
        public async Task CreateOrUpdate(Users user)
        {
            if (user.Id is not null)
                await _usersService.PutUser(user);
            else
                await _usersService.Create(user);
        }


        [HttpDelete("{id}")]
        public async Task DeleteUser(int id) =>
             await _usersService.DeleteUser(id);
    }
}
