using API_DotNet.Models.Product;
using API_DotNet.Repository.Product.Dtos;

namespace API_DotNet.Repository.Product
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetAll();
        Task<ProductDTO> GetById(int id);
        Task Create(Products prod);
        Task Update(Products prod);
        Task Delete(int id);
    }
}
