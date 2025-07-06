using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Members(AppDbContext context) : ControllerBase
    {
        // esta forma es reemplazada actualmente
        //private readonly DataContext _context;
        //public Users(DataContext context)
        //{
        //    _context = context;
        //}

        [HttpGet]
        public ActionResult<IReadOnlyList<AppUser>> GetMembers()
        {
            var users = context.Users.ToList();

            return users;

        }

        [HttpGet("{id}")] //ojo que es api/memberS/
        public ActionResult<AppUser> GetMember(string id)
        {
            var user = context.Users.Find(id);

            if(user == null) 
                return NotFound();

            return user;
        }
    }
}
