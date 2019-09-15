using System.Collections.Generic;
using System.Threading.Tasks;
using Banking.API.Dtos;
using Banking.API.Helpers;
using Banking.API.Models;
namespace Banking.API.Data
{
    public interface IAccountRepository
    {
        Task<PagedList<TblAccount>> GetAccounts(UserParams userParams);
        Task<TblAccount> Create(TblAccount account);
        TblAccount Update(TblAccount account);
        List<TblAccount> GetAllAccounts();

        bool CheckAccountExists(accountDto payment);

    }
}