using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Banking.API.Dtos;
using Banking.API.Helpers;
using Banking.API.Models;
namespace Banking.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

          public async Task<TblUser> Login(string user, string password)
        {
            var oUser = await _context.TblUser.FirstOrDefaultAsync(x => x.Username == user);
            if(user == null)
                return null;

            if(!VerifyPasswordHash(password, oUser.PasswordHash, oUser.PasswordSalt))
                return null ; 

            return oUser;
        }

          public async Task<TblUser> Register(TblUser user, string password)
        {
           byte[] passwordHash, passwordSalt;
           CreatePasswordHash(password,out passwordHash, out passwordSalt);
           user.PasswordHash = passwordHash;
           user.PasswordSalt = passwordSalt;
           await _context.TblUser.AddAsync(user);
           await _context.SaveChangesAsync();

           return user;
        }

         private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            { 
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.TblUser.AnyAsync(x => x.Username == email))
            return true;

            return false;
        }

           private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            { 
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }


    }
}