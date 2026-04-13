using API.Application.DTOs;
using API.Domain;
using API.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly INotesService _service;

        public NotesController(INotesService service)
        {
            _service = service;
        }

        /// <summary>
        /// Returns all notes
        /// </summary>
        /// <returns>List of notes</returns>
        // GET: api/Notes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NoteDTO>>> GetNotes()
        {
            var notes = await _service.GetAll();

            return Ok(notes);
        }

        /// <summary>
        /// Returns single note
        /// </summary>
        /// <param name="id">Id of the note</param>
        /// <returns>Note</returns>
        // GET: api/Notes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NoteDTO>> GetNote(Guid id)
        {
            var note = await _service.Get(id);

            if (note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }

        /// <summary>
        /// Updates single note
        /// </summary>
        /// <param name="id">Id of the note</param>
        /// <param name="note">Updated note</param>
        /// <returns></returns>
        // PUT: api/Notes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNote(Guid id, UpdateNoteDTO note)
        {
            var updated = await _service.Update(id,note);

            if (updated == null)
                return NotFound();

            return NoContent();
        }

        /// <summary>
        /// Creates a new note
        /// </summary>
        /// <param name="note">Note to create</param>
        /// <returns>Created note</returns>
        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(CreateNoteDTO note)
        {
            var createdNote = await _service.Create(note);

            return CreatedAtAction("GetNote", new { id = createdNote.Id }, createdNote);
        }

        /// <summary>
        /// Deletes note
        /// </summary>
        /// <param name="id">Id of the note</param>
        /// <returns></returns>
        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var deleted = await _service.Delete(id);
            if (deleted == null)
                return NotFound();

            return NoContent();
        }
    }
}
