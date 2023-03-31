namespace Pizza.Mgmt.Api.Services;

public class EntityDto<TPrimaryKey>
{
    public TPrimaryKey Id { get; set; }

    public EntityDto()
    {
    }

    public EntityDto(TPrimaryKey id)
    {
        Id = id;
    }
}