namespace Pizza.Mgmt.Api.Services.Employees;

public interface IEmployeeAppService
{
    Task<EmployeeDto> CreateAsync(CreateEmployeeInput input);
    
    Task<EmployeeDto> GetAsync(Guid id);

    Task<IEnumerable<EmployeeDto>> ListAsync();
    Task<EmployeeDto> UpdateAsync(EmployeeDto input);
}