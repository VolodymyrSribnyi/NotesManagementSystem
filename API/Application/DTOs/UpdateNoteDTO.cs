using API.Domain;
using System.ComponentModel.DataAnnotations;

namespace API.Application.DTOs
{
    public class UpdateNoteDTO
    {
        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }
        [Required]
        public required string Description { get; set; }
        [Required]
        [MaxLength(50)]
        public Status Status { get; set; }
    }
}
