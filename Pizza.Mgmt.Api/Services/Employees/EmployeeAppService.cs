using AutoMapper;
using Pizza.Mgmt.Api.Data;
using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Services.Employees;

public class EmployeeAppService: AppServiceBase, IEmployeeAppService
{
    private readonly IEmployeeRepository _repository;
   
    public EmployeeAppService(IEmployeeRepository repository, IMapper mapper) : base(mapper)
    {
        _repository = repository;
    }
    
    public async Task<EmployeeDto> CreateAsync(CreateEmployeeInput input)
    {
        var employee = new Employee
        {
            FirstName = input.FirstName,
            LastName = input.LastName,
            HourlyRate = input.HourlyRate,
            IsActive = input.IsActive
        };
        await _repository.InsertAsync(employee);
        await _repository.CompleteAsync();
        return _mapper.Map<EmployeeDto>(employee);
    }

    public async Task<EmployeeDto> GetAsync(Guid id)
    {
        var employee = await _repository.FindByIdAsync(id);
        return _mapper.Map<EmployeeDto>(employee);
    }

    public async Task<IEnumerable<EmployeeDto>> ListAsync()
    {
        var employees = await _repository.FindAsync(e => e.IsActive);
        return employees.Select(e => _mapper.Map<EmployeeDto>(e));
    }

    public async Task<EmployeeDto> UpdateAsync(EmployeeDto input)
    {
        var employee = await _repository.FindByIdAsync(input.Id);
        employee.FirstName = input.FirstName;
        employee.LastName = input.LastName;
        employee.HourlyRate = input.HourlyRate;
        employee.IsActive = input.IsActive;
        await _repository.UpsertAsync(employee);
        await _repository.CompleteAsync();
        return _mapper.Map<EmployeeDto>(employee);
    }
}
