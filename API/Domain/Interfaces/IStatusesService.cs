using API.Application.DTOs;

namespace API.Domain.Interfaces
{
    public interface IStatusesService
    {
        Task<IEnumerable<StatusDTO>> GetAll();
    }
}
