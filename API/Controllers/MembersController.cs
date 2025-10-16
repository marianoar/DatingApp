using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {
        // esta forma es reemplazada actualmente
        //private readonly DataContext _context;
        //public Users(DataContext context)
        //{
        //    _context = context;
        //}

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers()
        {
            //var users = await context.Users.ToListAsync();

            //return users;
            return Ok(await memberRepository.GetMemberAsync());

        }

        [HttpGet("{id}")] //ojo que es api/memberS/
        public async Task<ActionResult<Member>> GetMember(string id)
        {
            //var user = await context.Users.FindAsync(id);
            var user = await memberRepository.GetMemberByIdAsync(id); 

            if (user == null)
                return NotFound();

            return user; //deberia ser member
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        {
            return Ok(await memberRepository.GetPhotosForMemberAsync(id));
        }
    }
}
