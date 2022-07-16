using System.Collections.Generic;

namespace API.Errors
{
    public class ApiValidateErrorResponse : ApiResponse
    {
        public ApiValidateErrorResponse() : base(400)
        {
        }
        public IEnumerable<string> Errors { get; set; }
    }
}