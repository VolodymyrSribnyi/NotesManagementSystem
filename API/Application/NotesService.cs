using API.Application.DTOs;
using API.Domain;
using API.Domain.Interfaces;
using AutoMapper;

namespace API.Application
{
    public class NotesService : INotesService
    {
        private readonly INotesRepository _repository;
        private readonly IMapper _mapper;
        public NotesService(INotesRepository repository,IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<NoteDTO> Create(CreateNoteDTO note)
        {
            var noteToCreate = _mapper.Map<Note>(note);
            //{ 
            //    Id = Guid.NewGuid(), 
            //    Name = note.Name,
            //    Description = note.Description,
            //    CreatedAt = DateTime.UtcNow,
            //    Status = Status.NotStarted
            //};

            await _repository.Create(noteToCreate);

            var noteResponse = _mapper.Map<NoteDTO>(noteToCreate);
            //{
            //    Id = noteToCreate.Id,
            //    Name = noteToCreate.Name,
            //    Description = noteToCreate.Description,
            //    Status = noteToCreate.Status
            //};

            return noteResponse;
        }

        public async Task<NoteDTO> Delete(Guid id)
        {
            var note = await _repository.Get(id);

            if (note == null)
            {
                return null;
            }

            await _repository.Delete(id);

            return _mapper.Map<NoteDTO>(note);
        }

        public async Task<NoteDTO> Get(Guid id)
        {
            var note = await _repository.Get(id);

            return _mapper.Map<NoteDTO>(note);
        }

        public async Task<IEnumerable<NoteDTO>> GetAll()
        {
            var notes = await _repository.GetAll();

            if(!notes.Any())
                return Enumerable.Empty<NoteDTO>();

            return _mapper.Map<IEnumerable<NoteDTO>>(notes);
        }

        public async Task<NoteDTO> Update(NoteDTO note)
        {
            var noteToUpdate = await _repository.Get(note.Id);

            if (noteToUpdate == null)
            {
                return null;
            }
            var updatedNote = await _repository.Update(_mapper.Map<Note>(note));

            return _mapper.Map<NoteDTO>(updatedNote);
        }
    }
}
