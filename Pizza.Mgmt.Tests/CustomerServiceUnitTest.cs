using AutoMapper;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Pizza.Mgmt.Api.Data;
using Pizza.Mgmt.Api.Models;
using Pizza.Mgmt.Api.Services;
using Pizza.Mgmt.Api.Services.Customers;
using Pizza.Mgmt.Api.Services.Employees;

namespace Pizza.Mgmt.Tests;

public class CustomerServiceUnitTest : IClassFixture<DbContextFixture>
{
    DbContextFixture _fixture;
    CustomerAppService _service;
    CustomerRepository _repository;

    public CustomerServiceUnitTest(DbContextFixture fixture)
    {
        _fixture = fixture;
        var config = new MapperConfiguration(cfg => cfg.CreateMap<Employee, EmployeeDto>());
        _repository = new CustomerRepository(_fixture.Context);
        _service = new CustomerAppService(_repository, config.CreateMapper());
    }


    // Test create async
    [Fact]
    public async Task CreateAsync()
    {
        var customer = await _service.CreateCustomerAsync(
            new CreateCustomerInput
            {
                FirstName = "John",
                LastName = "Doe",
                Phone = "1234567890"
            });
        Assert.NotNull(customer);
        Assert.Equal("John", customer.FirstName);
        Assert.Equal("Doe", customer.LastName);
        Assert.Equal("1234567890", customer.Phone);
        // id is valid guid
        Guid guid;
        Assert.True(Guid.TryParse(customer.Id.ToString(), out guid));

    }

    // test unique phone number
    [Fact]
    public async Task CreateAsync_UniquePhone()
    {
        var customer = await _service.CreateCustomerAsync(
            new CreateCustomerInput
            {
                FirstName = "John",
                LastName = "Doe",
                Phone = "12345678901"
            });
        Assert.NotNull(customer);
        Assert.Equal("John", customer.FirstName);
        Assert.Equal("Doe", customer.LastName);
        Assert.Equal("12345678901", customer.Phone);
        // id is valid guid
        Guid guid;
        Assert.True(Guid.TryParse(customer.Id.ToString(), out guid));

        // try to create another customer with the same phone number
        await Assert.ThrowsAsync<ServiceException>(async () =>
        {
            await _service.CreateCustomerAsync(
                new CreateCustomerInput
                {
                    FirstName = "John",
                    LastName = "Doe",
                    Phone = "12345678901"
                });
        });
    }
}