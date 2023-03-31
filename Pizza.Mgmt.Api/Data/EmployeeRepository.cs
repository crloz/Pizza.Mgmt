using System.Linq.Expressions;
using Pizza.Mgmt.Api.Data.Common;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Data;

public class EmployeeRepository: Repository<Employee, Guid>, IEmployeeRepository
{
    public EmployeeRepository(AppDbContext context) : base(context)
    {
    }
}