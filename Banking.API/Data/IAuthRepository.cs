using System.Threading.Tasks;
using Banking.API.Dtos;
using Banking.API.Helpers;
using Banking.API.Models;
namespace Banking.API.Data
{
    public interface IAuthRepository
    {
         Task<TblUser> Register(TblUser user, string Password);
         Task<TblUser> Login(string User, string Password);
         Task<bool> UserExists(string Email);    
    }
}