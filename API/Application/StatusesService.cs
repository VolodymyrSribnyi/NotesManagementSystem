using API.Application.DTOs;
using API.Domain.Interfaces;
using AutoMapper;

namespace API.Application
{
    public class StatusesService : IStatusesService
    {
        private readonly IStatusesRepository _repository;
        private readonly IMapper _mapper;

        public StatusesService(IStatusesRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<StatusDTO>> GetAll()
        {
            var statuses = await _repository.GetAll();
            return _mapper.Map<IEnumerable<StatusDTO>>(statuses);
        }
    }
}
