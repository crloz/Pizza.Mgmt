using AutoMapper;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Services.Employees;

[AutoMap(typeof(Employee))]
public class EmployeeDto : EntityDto<Guid>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public decimal HourlyRate { get; set; }
    public bool IsActive { get; set; }
}