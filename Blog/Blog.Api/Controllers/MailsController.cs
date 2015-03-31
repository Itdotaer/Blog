using System.Web.Http;
using System.Web.Http.Cors;
using Blog.Api.Models;
using MailCore = Blog.Core.Common.Helpers.SendMail;

namespace Blog.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MailsController : ApiController
    {
        //Send mails
        public IHttpActionResult SendMail(Mail mail)
        {
            if (mail != null && !string.IsNullOrEmpty(mail.Name) && !string.IsNullOrEmpty(mail.EmailAddress) &&
                !string.IsNullOrEmpty(mail.PhoneNumber) && !string.IsNullOrEmpty(mail.Message))
            {
                var subject = string.Format("Mail send from {0}", mail.Name);
                var body =
                    string.Format(
                        "<div style=\"padding: 10px 50px 10px 50px; margin:auto; border: 1px solid black;\"><p> <h3>{0}</h3></p><hr/><p><h4>Name:{1}</h4><h4>EmailAddress:{2}</h4><h4>PhoneNumber:{3}</h4></p><hr/><p><fieldset><legend>Message:</legend>{4}</fieldset></p><div><div style=\"text-align:center\"><img alt=\"GitHub\" src=\"https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png\" width=\"50\"></div><p style=\"text-align:center;\"><a href=\"https://github.com/SoftwareDreamer/Blog\">Powered By Harry Hu</a></p></div></div>",
                        subject, mail.Name, mail.EmailAddress, mail.PhoneNumber, mail.Message);
                var rs = MailCore.SendMailTest(subject, body);

                if (!string.IsNullOrEmpty(rs))
                {
                    return Ok(new {result = "fail", data = rs});
                }

                return Ok(new {result = "ok", data = "Send mail to author successed."});
            }

            return Ok(new { result = "fail", data = "Your input mail information is not entire." });
        }
    }
}