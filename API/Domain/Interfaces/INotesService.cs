using API.Application.DTOs;

namespace API.Domain.Interfaces
{
    public interface INotesService
    {
        Task<NoteDTO> Get(Guid id);
        Task<IEnumerable<NoteDTO>> GetAll();
        Task<NoteDTO> Create(CreateNoteDTO note);
        Task<NoteDTO> Update(NoteDTO note);
        Task<NoteDTO> Delete(Guid id);
    }
}
