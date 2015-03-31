using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using Blog.Models;

namespace Blog.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PostsController : ApiController
    {
        private Entities db = new Entities();

        // GET api/Posts
        public IHttpActionResult GetPosts(int pageSize, int pageIndex)
        {
            var rsList =
                db.Posts.Take(pageSize*pageIndex).OrderByDescending(t => t.PublishedDate).Skip(pageSize*(pageIndex - 1));
            return Ok(new {totalSize = db.Posts.Count(), posts = rsList.ToList()});
        }

        // GET api/Posts/5
        [ResponseType(typeof(Posts))]
        public IHttpActionResult GetPosts(int id)
        {
            //Posts posts = db.Posts.Include("Users").FirstOrDefault(t=>t.Id == id);
            var posts = db.Posts.Find(id);
            if (posts == null)
            {
                return NotFound();
            }

            return Ok(posts);
        }

        // PUT api/Posts/5
        public IHttpActionResult PutPosts(int id, Posts posts)
        {
            posts.LastUpdatedDate = DateTime.Now;
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            if (id != posts.Id)
            {
                return BadRequest();
            }

            db.Entry(posts).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Posts
        [ResponseType(typeof(Posts))]
        public IHttpActionResult PostPosts(Posts posts)
        {
            posts.CreatedDate = DateTime.Now;
            posts.PublishedDate = posts.CreatedDate;
            posts.LastUpdatedDate = posts.CreatedDate;

            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            db.Posts.Add(posts);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = posts.Id }, posts);
        }

        // DELETE api/Posts/5
        [ResponseType(typeof(Posts))]
        public IHttpActionResult DeletePosts(int id)
        {
            Posts posts = db.Posts.Find(id);
            if (posts == null)
            {
                return NotFound();
            }

            db.Posts.Remove(posts);
            db.SaveChanges();

            return Ok(posts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostsExists(int id)
        {
            return db.Posts.Count(e => e.Id == id) > 0;
        }
    }
}