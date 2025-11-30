using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [HttpPut]
        public async Task<ActionResult> UpdateMember(MemberUpdateDto memberUpdateDto)
        {
            var memberId = User.GetMemberId();

            var member = await memberRepository.GetMemberForUpdate(memberId);
            if (member == null)
                return BadRequest("Something not found");

            member.DisplayName = memberUpdateDto.DisplayName ?? member.DisplayName;
            member.Description = memberUpdateDto.Description ?? member.Description;
            member.City = memberUpdateDto.City ?? member.City;
            member.Country = memberUpdateDto.Country ?? member.Country;

            member.User.DisplayName = memberUpdateDto.DisplayName ?? member.User.DisplayName;

            memberRepository.Update(member);

            if (await memberRepository.SaveAllAsync())
            {
                return NoContent();
            }

            return BadRequest("Failed to update");
        }
    }
}
