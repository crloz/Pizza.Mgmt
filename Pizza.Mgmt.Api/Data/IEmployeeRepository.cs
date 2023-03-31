using Pizza.Mgmt.Api.Data.Common;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Data;

public interface IEmployeeRepository: IRepository<Employee, Guid>
{
    
}