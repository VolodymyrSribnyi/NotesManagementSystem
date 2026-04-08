
using API.Application;
using API.Domain.Interfaces;
using API.Infrastructure;
using API.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddDbContext<NotesDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
            });
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<INotesRepository, NotesRepository>();
            builder.Services.AddScoped<INotesService, NotesService>();
            builder.Services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<NoteMapperProfile>();
            });
            

            var app = builder.Build();

            //using(var scope = app.Services.CreateScope())
            //{
            //    var services = scope.ServiceProvider;
            //    try
            //    {
            //        var context = services.GetRequiredService<NotesDbContext>();
            //        context.Database.EnsureCreated();
            //    }
            //    catch(Exception ex) 
            //    {
            //        Console.WriteLine(ex.Message);
            //    }
            //}

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("./v1/swagger.json", "NotesManagementystemAPI v1");
                c.RoutePrefix = "swagger";
            });

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
