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
            Note note = await _context.Notes.Include(n => n.Status).FirstOrDefaultAsync(n => n.Id == id);
            return note;
        }

        public async Task<IEnumerable<Note>> GetAll()
        {
            IEnumerable<Note> notes = await _context.Notes.Include(n => n.Status).ToListAsync();

            return notes;
        }

        public async Task<Note> Update(Guid id,Note note)
        {
            Note noteToUpdate = await Get(id);
            if (noteToUpdate == null)
                return null;

            noteToUpdate.Name = note.Name;
            noteToUpdate.Description = note.Description;
            noteToUpdate.StatusId = note.StatusId;

            await _context.SaveChangesAsync();

            return await Get(id);
        }

        private bool NoteExists(Guid id)
        {
            return _context.Notes.Any(e => e.Id == id);
        }
    }
}
