using System.ComponentModel.DataAnnotations;
using Pizza.Mgmt.Api.Models;
using Pizza.Mgmt.Api.Services.Customers;

namespace Pizza.Mgmt.Api.Services.Orders;

public class CreateOrderInput
{
    [Required]
    public decimal TotalPrice { get; set; }
    [Required]
    public PizzaSize PizzaSize { get; set; }
    [Required]
    public PizzaType PizzaType { get; set; }
    [Required]
    public string DeliveryAddress { get; set; }
    [Required]
    public CreateCustomerInput Customer { get; set; }
}