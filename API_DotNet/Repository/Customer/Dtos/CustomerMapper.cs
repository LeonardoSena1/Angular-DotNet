using API_DotNet.Models.Customer;

namespace API_DotNet.Repository.Customer.Dtos
{
    public static class CustomerMapper
    {
        public static CustomerDTO ToDTO(Customers pro)
        {
            return new CustomerDTO
            {
                Id = pro.Id,
                Cnpj = pro.Cnpj,
                RazaoSocial = pro.RazaoSocial,
            };
        }
    }
}
