using API_DotNet.Infrastructures;
using API_DotNet.Models.User;
using API_DotNet.Repository.Encryption;
using API_DotNet.Repository.User.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace API_DotNet.Repository.User
{
    public class UsersService : IUsersService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEncryptionService _encryptionService;

        public UsersService(ApplicationDbContext context
            , IEncryptionService encryptionService)
        {
            _context = context;
            _encryptionService = encryptionService;
        }

        public async Task<IEnumerable<UserDTO>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            var userDTOs = users.Select(u => UserMapper.ToDTO(u)).ToList();
            return userDTOs;
        }

        public async Task<UserDTO> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user is null)
                return new UserDTO();

            var userDTO = UserMapper.ToDTO(user);
            return userDTO;
        }

        public async Task Create(Users user)
        {
            string passwordEncryption = _encryptionService.CreateEncryption(Encoding.UTF8.GetBytes(string.Concat(user.Senha, ConstsUser.hashAlgorithm)));

            user.Senha = passwordEncryption;

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task PutUser(Users user)
        {
            var existingUser = await _context.Users.FindAsync(user.Id);

            if (existingUser == null)
                throw new Exception("Usuário não encontrado.");

            existingUser.NomeUsuario = user.NomeUsuario;
            existingUser.Login = user.Login;
            existingUser.CPF = user.CPF;

            if (!_encryptionService.IsPasswordDifferent(user.Senha, existingUser.Senha))
            {
                string senhaCriptografada = _encryptionService.CreateEncryption(Encoding.UTF8.GetBytes(string.Concat(user.Senha, ConstsUser.hashAlgorithm)));
                existingUser.Senha = senhaCriptografada;
            }

            _context.Entry(existingUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user is null)
                return;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}

