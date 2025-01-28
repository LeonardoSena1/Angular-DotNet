using API_DotNet.Models.Product;
using API_DotNet.Repository.Product;
using API_DotNet.Repository.Product.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API_DotNet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IEnumerable<ProductDTO>> GetUsers() =>
            await _productService.GetAll();


        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDTO>> GetUser(int id) =>
             await _productService.GetById(id);


        [HttpPost]
        public async Task CreateOrUpdate(Products pro)
        {
            if (pro.Id is not null)
                await _productService.Update(pro);
            else
                await _productService.Create(pro);
        }


        [HttpDelete("{id}")]
        public async Task DeleteUser(int id) =>
             await _productService.Delete(id);
    }
}
