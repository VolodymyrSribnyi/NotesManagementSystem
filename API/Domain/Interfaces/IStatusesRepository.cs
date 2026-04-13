namespace API.Domain.Interfaces
{
    public interface IStatusesRepository
    {
        Task<IEnumerable<Status>> GetAll();
    }
}
