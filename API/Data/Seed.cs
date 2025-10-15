using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(AppDbContext context)
        {
            if (await context.Users.AnyAsync())
                return;

            var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var members = JsonSerializer.Deserialize<List<SeedUserDto>>(memberData);
            if(members == null)
            {
                Console.WriteLine("No member to seed");
                return;
            }

            using var hmac = new HMACSHA512();

            foreach (var item in members)
            {
                var user = new AppUser
                {
                    Id = item.Id,
                    Email = item.Email,
                    DisplayName = item.DisplayName,
                    ImageUrl = item.ImageUrl,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                    PasswordSalt = hmac.Key,
                    Member = new Member
                    {
                        Id = item.Id,
                        DisplayName = item.DisplayName,
                        Description = item.Description,
                        DateOfBirth = item.DateOfBirth,
                        ImageUrl = item.ImageUrl,
                        Gender = item.Gender,
                        City = item.City,
                        Country = item.Country,
                        LastActive = item.LastActive,
                        Created = item.Created
                    }
                };
                user.Member.Photos.Add(new Photo
                {
                    Url = item.ImageUrl!,
                    MemberId = item.Id
                });

                context.Users.Add(user);
            }
            await context.SaveChangesAsync();
        }
    }
}
