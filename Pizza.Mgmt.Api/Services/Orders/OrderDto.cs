using AutoMapper;
using Pizza.Mgmt.Api.Models;
using Pizza.Mgmt.Api.Services.Customers;

namespace Pizza.Mgmt.Api.Services.Orders;

[AutoMap(typeof(Order))]
public class OrderDto: EntityDto<Guid>
{
    public Guid Id { get; set; }
   
    public decimal TotalPrice { get; set; }
    public PizzaSize PizzaSize { get; set; }
    public PizzaType PizzaType { get; set; }
    public string DeliveryAddress { get; set; }
    public OrderStatus Status { get; set; }
    public decimal TipAmount { get; set; }
    public CustomerDto Customer { get; set; }

}