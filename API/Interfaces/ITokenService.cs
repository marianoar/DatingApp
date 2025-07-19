using API.Entities;
using System.Text;

namespace API.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);

    }
}
