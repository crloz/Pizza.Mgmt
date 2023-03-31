using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Services.Customers;

public interface ICustomerAppService
{
    Task<Customer> CreateCustomerAsync(CreateCustomerInput input);
}