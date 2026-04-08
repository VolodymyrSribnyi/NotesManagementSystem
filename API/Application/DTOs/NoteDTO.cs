using API.Domain;

namespace API.Application.DTOs
{
    public class NoteDTO
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Status Status { get; set; }
    }
}
