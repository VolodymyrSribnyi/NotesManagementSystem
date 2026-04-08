using API.Domain;

namespace API.Domain.Interfaces
{
    public interface INotesRepository
    {
        Task<Note> Get(Guid id);
        Task<IEnumerable<Note>> GetAll();
        Task<Note> Create(Note note);
        Task<Note> Update(Note note);
        Task<Note> Delete(Guid id);
    }
}
