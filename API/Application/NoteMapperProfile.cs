using API.Application.DTOs;
using API.Domain;
using AutoMapper;

namespace API.Application
{
    public class NoteMapperProfile : Profile
    {
        public NoteMapperProfile()
        {
            CreateMap<CreateNoteDTO, Note>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());
            CreateMap<NoteDTO, Note>();
            CreateMap<Note, NoteDTO>();
            CreateMap<UpdateNoteDTO, Note>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedAt, opt => opt.Ignore());
        }
    }
}
