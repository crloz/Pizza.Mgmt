using System.ComponentModel.DataAnnotations;

namespace Pizza.Mgmt.Api.Services.Customers;

public class CreateCustomerInput
{
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Phone { get; set; }
}