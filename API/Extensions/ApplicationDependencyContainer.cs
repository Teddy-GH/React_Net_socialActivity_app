﻿using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Application.Activities;
using Microsoft.OpenApi.Models;
using Application.Interfaces;
using Infrastructure.Security;

namespace API.Extenstions
{
    public static class ApplicationDependencyContainer 
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(opt => opt.AddPolicy("CorsPolicy", policy => {
                policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
            }));

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddScoped<IUserAccessor, UserAccessor>();
            return services;
        }
    }
}
