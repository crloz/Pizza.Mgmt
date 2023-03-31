namespace Pizza.Mgmt.Api.Services;

public class ServiceException: Exception
{
    public ServiceException(string message) : base(message)
    {
    }
  
}