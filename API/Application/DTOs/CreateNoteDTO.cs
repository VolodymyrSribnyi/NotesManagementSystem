using System.ComponentModel.DataAnnotations;

namespace API.Application.DTOs
{
    public class CreateNoteDTO
    {
        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }
        [Required]
        public required string Description { get; set; }
        [Required]
        public Guid StatusId { get; set; }
    }
}
