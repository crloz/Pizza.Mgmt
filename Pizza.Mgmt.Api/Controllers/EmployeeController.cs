using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Pizza.Mgmt.Api.Services.Employees;

namespace Pizza.Mgmt.Api.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/employee")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeAppService _employeeAppService;

    public EmployeeController(IEmployeeAppService employeeAppService)
    {
        _employeeAppService = employeeAppService;
    }
    
    [HttpGet("{id:guid}")]
    public async Task<EmployeeDto> GetAsync(Guid id)
    {
        return await _employeeAppService.GetAsync(id);
    }


    [HttpPost]
    public async Task<EmployeeDto> CreateAsync(CreateEmployeeInput input)
    {
        return await _employeeAppService.CreateAsync(input);
    }
    
    [HttpGet]
    public async Task<IEnumerable<EmployeeDto>> ListAsync()
    {
        return await _employeeAppService.ListAsync();
    }

    [HttpPut("{id:guid}")]
    public async Task<EmployeeDto> UpdateAsync(EmployeeDto input)
    {
        // if (input.FirstName != "test")
        // {
        //     throw new BadHttpRequestException("ups");
        // }
        return await _employeeAppService.UpdateAsync(input);
    }


}