using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Banking.API.Dtos;
using Banking.API.Helpers;
using Banking.API.Models;

namespace Banking.API.Data
{
    public class AccountRepository : IAccountRepository
    {
        private readonly DataContext _context;

        public AccountRepository(DataContext context)
        {
            _context = context;
        }

         public async Task<PagedList<TblAccount>> GetAccounts(UserParams userParams)
         {         
       
            var accountsList = (from a in _context.TblAccount
                                orderby a.AccountId descending
                                select new TblAccount{
                                    AccountId =  a.AccountId,
                                    Name =  a.Name,
                                    MonthlyCreditLimit =  a.MonthlyCreditLimit
                                        }
                );
            return await PagedList<TblAccount>.CreateAsync(accountsList, userParams.PageNumber, userParams.PageSize);

         }

        
        public async Task<TblAccount> Create(TblAccount account)
        {
            await _context.TblAccount.AddAsync(account);
            await _context.SaveChangesAsync();

            return account;
        }

          public TblAccount Update(TblAccount account)
        {

            _context.Attach(account);
            IEnumerable<EntityEntry> unchangedEntities = _context.ChangeTracker.Entries().Where(x => x.State == EntityState.Unchanged);
            foreach (EntityEntry ee in unchangedEntities)
            {
                ee.State = EntityState.Modified;
            }
             _context.SaveChanges();

            return account;
        }

        public List<TblAccount> GetAllAccounts()
        {            
            var entity = _context.TblAccount.ToList<TblAccount>();
            return entity;
        }

          public bool CheckAccountExists(accountDto accountDto){                      
            
            var account = _context.TblAccount.Where(x=> x.Name.ToLower() == accountDto.Name.ToLower())
                    .Select(x=> x).SingleOrDefault();
       
             if ( account != null )
                return true;         

            return false;
        }
    }

}