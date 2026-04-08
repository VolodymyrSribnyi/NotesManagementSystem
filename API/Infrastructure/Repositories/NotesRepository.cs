using API.Domain;
using API.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories
{
    public class NotesRepository : INotesRepository
    {
        private readonly NotesDbContext _context;
        public NotesRepository(NotesDbContext context)
        {
            _context = context;
        }

        public async Task<Note> Create(Note note)
        {
            await _context.Notes.AddAsync(note);
            await _context.SaveChangesAsync();
            return note;
        }

        public async Task<Note> Delete(Guid id)
        {
            Note note = await Get(id);
            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return note;
        }

        public async Task<Note> Get(Guid id)
        {
            Note note = await _context.Notes.FindAsync(id);
            return note;
        }

        public async Task<IEnumerable<Note>> GetAll()
        {
            IEnumerable<Note> notes = await _context.Notes.ToListAsync();

            return notes;
        }

        public async Task<Note> Update(Note note)
        {
            Note noteToUpdate = await Get(note.Id);

            noteToUpdate.Id = note.Id;
            noteToUpdate.Name = note.Name;
            noteToUpdate.Description = note.Description;
            noteToUpdate.Status = note.Status;

            await _context.SaveChangesAsync();

            return noteToUpdate;
        }

        private bool NoteExists(Guid id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}
