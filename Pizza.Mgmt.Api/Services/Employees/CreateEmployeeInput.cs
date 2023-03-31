using System.ComponentModel.DataAnnotations;

namespace Pizza.Mgmt.Api.Services.Employees;

public class CreateEmployeeInput
{
    [Required]
    public string FirstName { get; set; }
    
    [Required]
    public string LastName { get; set; }
    
    [Required]
    public decimal HourlyRate { get; set; }
    
    [Required]
    public bool IsActive { get; set; }
    
    
}