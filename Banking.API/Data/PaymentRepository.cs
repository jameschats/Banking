using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Banking.API.Dtos;
using Banking.API.Helpers;
using Banking.API.Models;
using System.Data.SqlClient;
using System.Data;

namespace Banking.API.Data
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly DataContext _context;

        public PaymentRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<paymentDto>> GetPayments(UserParams userParams)
         {         
       
            var accountsList = (from a in _context.TblPayment
                                join b in _context.TblAccount on a.AccountId equals b.AccountId
                                orderby a.TransactionDate descending
                                select new paymentDto{
                                    AccountId =  a.AccountId.ToString(),
                                    Amount =  a.Amount.ToString(),
                                    TransactionDate =  a.TransactionDate,
                                    TransactionId = a.TransactionId.ToString(),
                                    Name = b.Name
                                        }
                );
            return await PagedList<paymentDto>.CreateAsync(accountsList, userParams.PageNumber, userParams.PageSize);

         }


         public async Task<PagedList<paymentDto>> GetPerformersByLinq(UserParams userParams)
         {         
            DateTime? fromdate = null ;
            DateTime? todate = null;
            if (userParams.FromDate=="undefined"){
                 fromdate = Convert.ToDateTime("1900-01-01");
            }
            else{
                 fromdate = Convert.ToDateTime(userParams.FromDate);
            }
             if (userParams.ToDate=="undefined"){
                 todate = Convert.ToDateTime(DateTime.Now);
            }
            else{           
            todate = Convert.ToDateTime(userParams.ToDate);}
       
            var paymentsList = (from a in _context.TblPayment
                                join b in _context.TblAccount on a.AccountId equals b.AccountId                             
                                where a.TransactionDate >= Convert.ToDateTime(fromdate) 
                                where a.TransactionDate <= Convert.ToDateTime(todate) 
                                group a by new { b.Name, b.AccountId, b.MonthlyCreditLimit} into g                                                                                     
                                select new paymentDto{                                   
                                    AccountId =Convert.ToString( g.Key.AccountId),
                                    Name = g.Key.Name.ToString(),
                                    Usage = Convert.ToString((g.Sum(oi =>  oi.Amount ) / g.Key.MonthlyCreditLimit) * 100),
                                    Amount =  Convert.ToString(g.Sum(oi =>  oi.Amount )) ,
                                    MonthlyCreditLimit =  Convert.ToString(g.Key.MonthlyCreditLimit)                         
                                
                                }into x
                                   select x);                
            

            if (userParams.SortColumn=="undefined")
            {
                userParams.SortColumn="amount";
                userParams.SortDirection="desc";
            }

                if (!string.IsNullOrEmpty(userParams.SortColumn) && !string.IsNullOrEmpty(userParams.SortDirection)
                && userParams.SortDirection.ToLower() == "desc")
                {
                    switch (userParams.SortColumn)
                    {
                        case "name":
                            paymentsList = paymentsList.OrderByDescending(u => u.Name);
                            break;
                        case "amount":
                            paymentsList = paymentsList.OrderByDescending(u => u.Amount);
                            break;
                     
                        default:
                            paymentsList = paymentsList.OrderByDescending(u => u.Name);
                            break;
                    }
                }

                if (!string.IsNullOrEmpty(userParams.SortColumn) && !string.IsNullOrEmpty(userParams.SortDirection)
                && userParams.SortDirection.ToLower() == "asc")
                {
                    switch (userParams.SortColumn)
                    {
                        case "name":
                            paymentsList = paymentsList.OrderBy(u => u.Name);
                            break;
                        case "amount":
                            paymentsList = paymentsList.OrderBy(u => u.Amount);
                            break;
                     
                        default:
                            paymentsList = paymentsList.OrderBy(u => u.Name);
                            break;
                    }
                }

            return await PagedList<paymentDto>.CreateAsync(paymentsList, userParams.PageNumber, userParams.PageSize);

         }


        public PagedList<paymentDto> GetPerformers(UserParams userParams)
         {         
            DateTime? fromdate = null ;
            DateTime? todate = null;
            if (userParams.FromDate=="undefined"){
                 fromdate = Convert.ToDateTime("1900-01-01");
            }
            else{
                 fromdate = Convert.ToDateTime(userParams.FromDate);
            }
             if (userParams.ToDate=="undefined"){
                 todate = Convert.ToDateTime(DateTime.Now);
            }
            else{           
            todate = Convert.ToDateTime(userParams.ToDate);}

            if (userParams.SortColumn=="undefined")
            {
                userParams.SortColumn="amount";
                userParams.SortDirection="desc";
            }

         
                string sql = "dbo.prcGetPerformers";
                SqlConnection conn = new SqlConnection("Server=localhost\\SQLEXPRESS;Database=Banking;Trusted_Connection=True;");
                SqlCommand command = new SqlCommand(sql, conn);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.Add("@FromDate", SqlDbType.DateTime).Value = userParams.FromDate;
                command.Parameters.Add("@ToDate", SqlDbType.DateTime).Value = userParams.ToDate;
                command.Parameters.Add("@SortColumn", SqlDbType.VarChar).Value = userParams.SortColumn;
                command.Parameters.Add("@SortDirection", SqlDbType.VarChar).Value = userParams.SortDirection;

                SqlDataAdapter adapter = new SqlDataAdapter(command);
                DataSet ds = new DataSet();
                adapter.Fill(ds, "Performers");
                DataTable dt = ds.Tables["Performers"];

              
              var  paymentsList = (from DataRow dr in dt.Rows
                               select new paymentDto
                               {
                                   AccountId = dr["AccountId"].ToString(),
                                   Name = dr["Name"].ToString(),
                                   Usage = dr["Usage"].ToString(),
                                   Amount = dr["Amount"].ToString(),
                                   MonthlyCreditLimit = dr["MonthlyCreditLimit"].ToString(),
                            }).AsQueryable();

             return  PagedList<paymentDto>.Create(paymentsList, userParams.PageNumber, userParams.PageSize);
       
         }

        public async Task<TblPayment> Create(TblPayment payment)
        {
            await _context.TblPayment.AddAsync(payment);
            await _context.SaveChangesAsync();

            return payment;
        }

          public TblPayment Update(TblPayment payment)
        {

            _context.Attach(payment);
            IEnumerable<EntityEntry> unchangedEntities = _context.ChangeTracker.Entries().Where(x => x.State == EntityState.Unchanged);
            foreach (EntityEntry ee in unchangedEntities)
            {
                ee.State = EntityState.Modified;
            }
             _context.SaveChanges();

            return payment;
        }

        public bool CheckUsageLimit(paymentDto payment){

            var result = _context.TblPayment.Where(x => x.TransactionDate.Month == DateTime.Now.Month)
                    .Where(x=> x.AccountId ==  Convert.ToInt32(payment.AccountId));
            result = result.GroupBy(o => o.AccountId)                    
                   .Select(g => new TblPayment { AccountId = g.Key, Amount = g.Sum(i => i.Amount) });
            
            
            var monthCreditLimit = _context.TblAccount.Where(x=> x.AccountId == Convert.ToInt32( payment.AccountId))
                    .Select(x=> x.MonthlyCreditLimit).SingleOrDefault();
       
             if ( Convert.ToDouble(payment.Amount) > monthCreditLimit)
                return false;

             foreach (var group in result)
                {
                    if ( Convert.ToDouble(group.Amount) + Convert.ToDouble(payment.Amount) > monthCreditLimit)
                        return false;
                    else
                        return true;
                  }
         

            return true;
        }

    }
}