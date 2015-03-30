using System;
using System.Linq;
using System.Security.Cryptography;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Blog.Core.Common.Helpers;
using Blog.Models;
using View_Users = Blog.Api.Models.Users;

namespace Blog.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private Entities db = new Entities();

        //Post api/Users/Login
        [HttpPost]
        [ResponseType(typeof(View_Users))]
        public IHttpActionResult Login(Users user)
        {
            if (user != null)
            {
                var foundUsers = db.Users.FirstOrDefault(t => t.Email == user.Email && t.Password == user.Password);


                if (foundUsers != null)
                {
                    return
                        Ok(new View_Users {Id = foundUsers.Id, Email = foundUsers.Email, UserName = foundUsers.UserName});
                }
                else
                {
                    return NotFound();
                }
            }

            return NotFound();
        }

        [HttpGet]
        public IQueryable<Users> GetUsers()
        {
            return db.Users;
        }

        private bool UsersExists(string email)
        {
            return db.Users.Count(e => e.Email == email) > 0;
        }

        [HttpGet]
        public IHttpActionResult GetMd5Hash(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return Ok(new {result="fail", data="Md5 input is null"});
            }

            return Ok(new { result = "ok", data = MD5Encorpy.GetMd5Hash(input) });
        }

        protected override void Dispose(bool disposing)
        {
            db = null;
            base.Dispose(disposing);
        }
    }
}