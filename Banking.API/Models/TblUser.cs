using System;
using System.Collections.Generic;

namespace Banking.API.Models
{
    public partial class TblUser
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool? Active { get; set; }
    }
}
