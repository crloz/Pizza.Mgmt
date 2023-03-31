using AutoMapper;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Services.Customers;

[AutoMap(typeof(Customer))]
public class CustomerDto : EntityDto<Guid>
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Phone { get; set; }
}