using Pizza.Mgmt.Api.Data.Common;

namespace Pizza.Mgmt.Api.Models;

public class Employee: IEntity<Guid>
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public decimal HourlyRate { get; set; }
    public bool IsActive { get; set; }
    public ICollection<Order> Orders { get; set; }
}