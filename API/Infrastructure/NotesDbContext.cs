using API.Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure
{
    public class NotesDbContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>(note =>
            {
                note.HasKey(n => n.Id);
                note.Property(n => n.Name).HasMaxLength(50);
                note.Property(n => n.Id).HasDefaultValueSql("NEWID()").ValueGeneratedOnAdd();
                note.Property(n => n.CreatedAt).HasDefaultValueSql("GETUTCDATE()").ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Status>(status =>
            {
                status.HasKey(n => n.Id);
                status.Property(s => s.Id).HasDefaultValueSql("NEWID()").ValueGeneratedOnAdd();
                status.Property(s => s.Name).HasMaxLength(50);
                status.Property(s => s.Color).HasMaxLength(50);
            });
            modelBuilder.Entity<Status>().HasData(
                new Status { Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), Name = "To Do", Description = "Треба зробити", Color = "#gray" },
                new Status { Id = Guid.Parse("22222222-2222-2222-2222-222222222222"), Name = "In Progress", Description = "В процесі", Color = "#blue" },
                new Status { Id = Guid.Parse("33333333-3333-3333-3333-333333333333"), Name = "Done", Description = "Виконано", Color = "#green" }
            );
        }
    }
}
