using System;

namespace Banking.API.Dtos
{
    public class paymentDto
    {
        public string AccountId { get; set; }
        public string Name { get; set; }
        public string Amount { get; set; }
        public DateTime? TransactionDate { get; set; }
        public string TransactionId { get; set; }

        public string Response { get; set; }

        public string Usage {get; set;}

        public string MonthlyCreditLimit {get;set;}
    }
}