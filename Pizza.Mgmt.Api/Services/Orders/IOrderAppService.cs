using Pizza.Mgmt.Api.Models;

namespace Pizza.Mgmt.Api.Services.Orders;

public interface IOrderAppService
{
    Task<OrderDto> CreateOrderAsync(CreateOrderInput input);
}