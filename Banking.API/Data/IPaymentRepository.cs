using System.Threading.Tasks;
using Banking.API.Dtos;
using Banking.API.Helpers;
using Banking.API.Models;
namespace Banking.API.Data
{
    public interface IPaymentRepository
    {
        Task<PagedList<paymentDto>> GetPayments(UserParams userParams);

        Task<TblPayment> Create(TblPayment payment);
        TblPayment Update(TblPayment payment);

        bool CheckUsageLimit(paymentDto payment);

        PagedList<paymentDto> GetPerformers(UserParams userParams);
    }
}