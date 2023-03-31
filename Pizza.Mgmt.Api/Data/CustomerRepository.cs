using Pizza.Mgmt.Api.Data.Common;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Data;

public class CustomerRepository: Repository<Customer, Guid>, ICustomerRepository
{
    public CustomerRepository(AppDbContext context) : base(context)
    {
    }
}