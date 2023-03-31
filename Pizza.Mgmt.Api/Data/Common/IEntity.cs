namespace Pizza.Mgmt.Api.Data.Common;

public interface IEntity<TPrimaryKey>
{
    TPrimaryKey Id { get; set; }
}
