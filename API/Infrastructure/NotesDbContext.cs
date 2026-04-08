using API.Domain;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure
{
    public class NotesDbContext : DbContext
    {
        public DbSet<Note> Notes { get; set; }
        public NotesDbContext() { }
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
        }
    }
}
