using System;
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
    public class PaymentController : ControllerBase
    {

        private readonly IPaymentRepository _repo;
      
        public PaymentController(IPaymentRepository repo)
        {
            _repo = repo;
        }
        
           [HttpGet]
        public async Task<IActionResult> GetPayments([FromQuery]UserParams userParams)
        {
            var accounts = await _repo.GetPayments(userParams);          

            Response.AddPagination(accounts.CurrentPage, accounts.PageSize,
                accounts.TotalCount, accounts.TotalPages);

            return Ok(accounts);
        }

         [HttpPost("create")]
         public async Task<IActionResult> Create(paymentDto oPaymentDto)
         {

             if (!_repo.CheckUsageLimit(oPaymentDto))
             {
                 oPaymentDto.Response = "Amount exceeds the Monthly Limit";
                 return Ok(oPaymentDto);
             }

              // INSERT
            if (oPaymentDto.TransactionId == null)
            {
                var payment = new TblPayment
                {
                    AccountId =Convert.ToInt32(oPaymentDto.AccountId),
                    Amount = Convert.ToDouble(oPaymentDto.Amount),
                    TransactionDate = DateTime.Now
                };

                var createdAccount = await _repo.Create(payment);
                return Ok(createdAccount);
            }
            // UPDATE
            else
            {
                 var payment = new TblPayment
                {
                    TransactionId = Convert.ToInt32(oPaymentDto.TransactionId),
                    AccountId = Convert.ToInt32(oPaymentDto.AccountId),
                    Amount =Convert.ToDouble(oPaymentDto.Amount),
                    TransactionDate = DateTime.Now
                };
                 var updatedUser = _repo.Update(payment);
                return Ok(updatedUser);
            }
         }

            [HttpGet("GetPerformers")]
             public async Task<IActionResult> GetPerformers([FromQuery]UserParams userParams)
            {
            var accounts =  _repo.GetPerformers(userParams);          

            Response.AddPagination(accounts.CurrentPage, accounts.PageSize,
                accounts.TotalCount, accounts.TotalPages);

            return Ok(accounts);
             }
            

         }
    }
