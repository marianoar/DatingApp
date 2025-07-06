using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetMembers()
        {
            var users = await context.Users.ToListAsync();

            return users;

        }

        [HttpGet("{id}")] //ojo que es api/memberS/
        public async Task<ActionResult<AppUser>> GetMember(string id)
        {
            var user = await context.Users.FindAsync(id);

            if(user == null) 
                return NotFound();

            return user;
        }
    }
}
