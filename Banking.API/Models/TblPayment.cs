using System;
using System.Collections.Generic;

namespace Banking.API.Models
{
    public partial class TblPayment
    {
        public long TransactionId { get; set; }
        public DateTime TransactionDate { get; set; }
        public int AccountId { get; set; }
        public double Amount { get; set; }
    }
}
