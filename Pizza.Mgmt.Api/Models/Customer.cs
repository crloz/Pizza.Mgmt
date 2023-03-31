using Pizza.Mgmt.Api.Data.Common;

namespace Pizza.Mgmt.Api.Models;

public class Customer : IEntity<Guid>
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
    public ICollection<Order> Orders { get; set; }
}