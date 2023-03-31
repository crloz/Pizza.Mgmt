using AutoMapper;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Pizza.Mgmt.Api.Data;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Services.Customers;

public class CustomerAppService : AppServiceBase, ICustomerAppService
{
    private readonly ICustomerRepository _repository;

    public CustomerAppService(ICustomerRepository repository, IMapper mapper) : base(mapper)
    {
        _repository = repository;
    }

    public async Task<Customer> CreateCustomerAsync(CreateCustomerInput input)
    {
        var existent = await _repository.FindAsync(c => c.Phone == input.Phone);
        if (existent != null && existent.Any())
        {
            throw new ServiceException("Customer with this phone number already exists");
        }

        var customer = new Customer
        {
            FirstName = input.FirstName,
            LastName = input.LastName,
            Phone = input.Phone
        };
        await _repository.InsertAsync(customer);
        await _repository.CompleteAsync();
        return customer;
    }
}