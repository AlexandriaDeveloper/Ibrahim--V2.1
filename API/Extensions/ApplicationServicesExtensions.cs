using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServicesExtensions(this IServiceCollection services)
        {
            services.AddScoped<IUOW, UOW>();
            services.AddScoped<ITokenService, TokenService>();

            services.AddTransient<IEmployeeService, EmployeeService>();
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()
                    ;
                });
            });
            services.Configure<ApiBehaviorOptions>(opt =>
          {
              opt.InvalidModelStateResponseFactory = (actionContext) =>
              {
                  var errors = actionContext.ModelState
                  .Where(e => e.Value.Errors.Count > 0)
                  .SelectMany(x => x.Value.Errors)
                  .Select(x => x.ErrorMessage).ToArray();
                  var errorResponse = new ApiValidateErrorResponse
                  {
                      Errors = errors
                  };

                  return new BadRequestObjectResult(errorResponse);
              };
          });
            return services;
        }

    }
}