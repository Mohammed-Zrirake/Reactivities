using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSuccess { get; private set; }
        public T? Value { get; private set; }
        public string? Error { get; private set; }
        public int Code { get; private set; }
        public static Result<T> Success(T value) => new() 
        {
            IsSuccess = true,
            Value = value
        };
        public static Result<T> Failure(string error, int code) =>new() 
                {
            IsSuccess = false,
            Error = error,
            Code = code
        };
      
    }
}
