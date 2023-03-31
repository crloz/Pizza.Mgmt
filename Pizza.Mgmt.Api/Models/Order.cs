using Pizza.Mgmt.Api.Data.Common;

namespace Pizza.Mgmt.Api.Models;

public class Order: IEntity<Guid>
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public decimal TotalPrice { get; set; }
    public PizzaSize PizzaSize { get; set; }
    public PizzaType PizzaType { get; set; }
    public string DeliveryAddress { get; set; }
    public OrderStatus Status { get; set; }
    public decimal TipAmount { get; set; }
    public Guid? EmployeeId { get; set; }
    public Employee Employee { get; set; }
    public Guid CustomerId { get; set; }
    public Customer Customer { get; set; }
}

public enum PizzaType
{
    Margherita,
    Pepperoni,
    Hawaiian,
    Vegetarian
}

public enum PizzaSize
{
    Small,
    Medium,
    Large
}

public enum OrderStatus
{
    Received,
    Preparing,
    Baking,
    Delivering,
    Delivered
}