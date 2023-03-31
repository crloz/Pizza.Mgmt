using AutoMapper;
using Pizza.Mgmt.Api.Data;

namespace Pizza.Mgmt.Api.Services;

public abstract class AppServiceBase
{
    protected readonly IMapper _mapper;

    protected AppServiceBase(IMapper mapper)
    {
        _mapper = mapper;
    }
}