using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Pizza.Mgmt.Api.Models;
using Pizza.Mgmt.Api.Services;
using Pizza.Mgmt.Api.Services.Orders;

namespace Pizza.Mgmt.Api.Controllers;

[ApiController]
[ApiVersion(1.0)]
[Route("api/v{version:apiVersion}/order")]
public class OrderController: ControllerBase
{
    IOrderAppService _orderAppService;

    public OrderController(IOrderAppService orderAppService)
    {
        _orderAppService = orderAppService;
    }
    
    [HttpPost]
    public async Task<OrderDto> CreateOrderAsync(CreateOrderInput input)
    {
        // catch ServiceException and return 400
        try
        {
            return await _orderAppService.CreateOrderAsync(input);
        }
        catch (ServiceException e)
        {
            throw new BadHttpRequestException(e.Message);
        }
        
       
    }
   
}