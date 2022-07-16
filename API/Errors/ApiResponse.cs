namespace API.Errors
{
    public class ApiResponse
    {
        private readonly int statusCode;
        private readonly string message;

        public ApiResponse(int statusCode, string message = null)
        {
            this.statusCode = statusCode;
            this.message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "A bad request, you have made",
                401 => "Authorized, you are not",
                403 => "Forbidden from doing this, you are",
                404 => "Resource found, it was not",
                500 => "Errors are the path to the dark side. Errors lead to anger.  Anger leads to hate.  Hate leads to career change",
                _ => null
            };
        }
    }
}