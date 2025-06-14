using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class AppException(int statusCode, string message, string details = null) 
    {
        public int StatusCode { get; set; } = statusCode;
        public string Details { get; set; } = details ?? string.Empty;
        public string Message { get; set; } = message ?? string.Empty;
    }

}
