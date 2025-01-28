using API_DotNet.Infrastructures;
using API_DotNet.Models.Product;
using API_DotNet.Repository.Product.Dtos;
using Microsoft.EntityFrameworkCore;

namespace API_DotNet.Repository.Product
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductDTO>> GetAll()
        {
            var users = await _context.Products.ToListAsync();
            var userDTOs = users.Select(u => ProductMapper.ToDTO(u)).ToList();
            return userDTOs;
        }

        public async Task<ProductDTO> GetById(int id)
        {
            var prod = await _context.Products.FindAsync(id);

            if (prod is null)
                return new ProductDTO();

            var prodDTO = ProductMapper.ToDTO(prod);
            return prodDTO;
        }

        public async Task Create(Products prod)
        {
            _context.Products.Add(prod);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Products prod)
        {
            var existingProd = await _context.Products.FindAsync(prod.Id);

            if (existingProd is null)
                throw new Exception("Produto não encontrado.");

            existingProd.NomeProduto = prod.NomeProduto;
            existingProd.Preco = prod.Preco;
                        
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var prod = await _context.Products.FindAsync(id);

            if (prod is null)
                return;

            _context.Products.Remove(prod);
            await _context.SaveChangesAsync();
        }
    }
}
