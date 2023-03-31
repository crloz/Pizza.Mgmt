using AutoMapper;
using Pizza.Mgmt.Api.Data;
using Pizza.Mgmt.Api.Models;
using Pizza.Mgmt.Api.Services.Customers;

namespace Pizza.Mgmt.Api.Services.Orders;

public class OrderAppService: AppServiceBase, IOrderAppService
{
    private readonly IOrderRepository _repository;
    private readonly ICustomerAppService _customerAppService;
    public OrderAppService(IOrderRepository repository, ICustomerAppService customerAppService, IMapper mapper) : base(mapper)
    {
        _repository = repository;
        _customerAppService = customerAppService;
    }
    
    public async Task<Order> CreateOrderAsync(CreateOrderInput input)
    {
        var customer = await _customerAppService.CreateCustomerAsync(input.Customer);
        var order = new Order
        {
            CreatedAt = DateTime.Now,
            TotalPrice = input.TotalPrice,
            PizzaSize = input.PizzaSize,
            PizzaType = input.PizzaType,
            DeliveryAddress = input.DeliveryAddress,
            Status = OrderStatus.Received,
            Customer = customer
        };
        await _repository.InsertAsync(order);
        return order;
    }
}
