using API.Domain;
using API.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
namespace API.Infrastructure.Repositories
{
    public class StatusesRepository : IStatusesRepository
    {
        private readonly NotesDbContext _context;
        public StatusesRepository(NotesDbContext context) 
        { 
            _context = context; 
        }

        public async Task<IEnumerable<Status>> GetAll()
        {
            IEnumerable<Status> statuses = await _context.Statuses.ToListAsync();
            return statuses;
        }
            
    }
}
