export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}

export class User {
    name  : string;  
    image  : string;   
    status : boolean;
   }

   export interface UserParams {
    sortColumn: string;
    sortDirection: string;
    fromDate: string;
    toDate: string;
    text : string; 
}