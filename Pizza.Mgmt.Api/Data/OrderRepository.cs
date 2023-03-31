using Pizza.Mgmt.Api.Data.Common;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Data;

public class OrderRepository : Repository<Order, Guid>, IOrderRepository
{
    public OrderRepository(AppDbContext context) : base(context)
    {
    }
}

