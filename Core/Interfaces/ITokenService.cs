using System.Threading.Tasks;
using Core.Models.IdentityModels;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(AppUser user);
    }
}