using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Banking.API.Data;
using Banking.API.Dtos;
using Banking.API.Helpers;
using Banking.API.Models;

namespace Banking.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {

        private readonly IAccountRepository _repo;

        public AccountController(IAccountRepository repo)
        {
            _repo = repo;
        }

        
         [HttpGet]
        public async Task<IActionResult> GetAccounts([FromQuery]UserParams userParams)
        {
            var accounts = await _repo.GetAccounts(userParams);          

            Response.AddPagination(accounts.CurrentPage, accounts.PageSize,
                accounts.TotalCount, accounts.TotalPages);

            return Ok(accounts);
        }

         [HttpPost("create")]
         public async Task<IActionResult> Create(accountDto oAccountDto)
         {
              // INSERT
            if (oAccountDto.AccountId == null)
            {
                if(_repo.CheckAccountExists(oAccountDto)){
                    oAccountDto.Response="Account name already exists";
                    return Ok(oAccountDto);
                }

                var account = new TblAccount
                {
                    Name = oAccountDto.Name,
                    MonthlyCreditLimit = (oAccountDto.MonthlyCreditLimit == "") ? (double?)null : Convert.ToDouble(oAccountDto.MonthlyCreditLimit)
                };

                var createdAccount = await _repo.Create(account);
                return Ok(createdAccount);
            }
            // UPDATE
            else
            {
                 var account = new TblAccount
                {
                    AccountId = Convert.ToInt32(oAccountDto.AccountId),
                    Name = oAccountDto.Name,
                    MonthlyCreditLimit = (oAccountDto.MonthlyCreditLimit == "") ? (double?)null : Convert.ToDouble(oAccountDto.MonthlyCreditLimit)
                };
                 var updatedUser = _repo.Update(account);
                return Ok(updatedUser);
            }
            

         }

        [HttpGet("getAllAccounts")]
        public ActionResult<List<TblAccount>> getAllAccounts()
        {
            var entity = _repo.GetAllAccounts();
            return entity;
        }
    }
}