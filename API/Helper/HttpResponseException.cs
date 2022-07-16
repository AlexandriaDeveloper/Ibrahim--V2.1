using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helper
{
    public class HttpResponseException : Exception
    {
#nullable enable
        public int StatusCode { get; set; }
        public object? Value { get; set; }
        public HttpResponseException(int statusCode, object? value = null)
        {
            this.Value = value;
            this.StatusCode = statusCode;
        }
    }
    public class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
    {
        public int Order => int.MaxValue - 10;

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception is HttpResponseException httpResponseException)
            {
                context.Result = new ObjectResult(httpResponseException.Value)
                {
                    StatusCode = httpResponseException.StatusCode
                };
                context.ExceptionHandled = true;
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            return;
        }
    }


}
