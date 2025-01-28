using API_DotNet.Models.Product;

namespace API_DotNet.Repository.Product.Dtos
{
    public static class ProductMapper
    {
        public static ProductDTO ToDTO(Products pro)
        {
            return new ProductDTO
            {
                Id = pro.Id,
                NomeProduto = pro.NomeProduto,
                Preco = pro.Preco,
            };
        }
    }
}
