using System.Collections.Specialized;
using System.ComponentModel.DataAnnotations;

namespace Blog.Api.Models
{
    public class Mail
    {
        public string Name { get; set; }
        public string EmailAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string Message { get; set; }
    }
}