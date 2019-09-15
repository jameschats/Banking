namespace Banking.API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }

        public string FromDate { get; set; }
        public string ToDate { get; set; }

        public string SortColumn { get; set; }

        public string SortDirection { get; set; }

    }
}