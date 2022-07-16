namespace API.Errors
{
    public class APIException : ApiResponse
    {
        public string Details { get; }
        public APIException(int statusCode, string message = null, string details = null) : base(statusCode, message)
        {
            this.Details = details;
        }
    }
}