using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
namespace Blog.Core.Common.Helpers
{
    public class SendMail
    {
        public static string SendMailTest(string subject, string body)
        {
            var smtpServerName = ConfigurationManager.AppSettings.Get("smtpServer");
            var mailFrom = ConfigurationManager.AppSettings.Get("MailFrom");
            var mailPassword = ConfigurationManager.AppSettings.Get("MailPassword");
            var mailTo = ConfigurationManager.AppSettings.Get("MailTo");

            if (!string.IsNullOrEmpty(smtpServerName) && !string.IsNullOrEmpty(mailFrom) && !string.IsNullOrEmpty(mailPassword) && !string.IsNullOrEmpty(mailTo))
            {
                using (var smtpClient = new SmtpClient())
                {
                    smtpClient.EnableSsl = true;
                    smtpClient.Host = smtpServerName;
                    smtpClient.Port = 587;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Credentials = new NetworkCredential(mailFrom, mailPassword);

                    var mailMessage = new MailMessage(mailFrom, mailTo, subject, body) {IsBodyHtml = true};

                    try
                    {
                        smtpClient.Send(mailMessage);
                    }
                    catch (Exception ex)
                    {
                        return "Exception:" + ex.Message;
                    }

                    return "";
                }
            }

            return "MailFrom or user isn't configed.";
        }
    }
}
