namespace API.Domain
{
    public class Note
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Guid StatusId { get; set; }
        public Status Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
