using System;
using System.Collections.Generic;

namespace Banking.API.Models
{
    public partial class TblAccount
    {
        public int AccountId { get; set; }
        public string Name { get; set; }
        public double? MonthlyCreditLimit { get; set; }
    }
}
