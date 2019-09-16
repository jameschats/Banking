import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountClass } from '../_models/account';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};  

@Injectable({
  providedIn: 'root'
})
export class AccountService {
 
  baseUrl = environment.apiUrl + 'account/';
  stringifiedData: any;
  accountObj: any;
  accountMode:any='add';
  

  constructor(private http: HttpClient) {}

  getAccounts(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<AccountClass[]>> {
    const paginatedResult: PaginatedResult<AccountClass[]> = new PaginatedResult<AccountClass[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<AccountClass[]>(this.baseUrl, { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  createAccount(model: any) {
    console.log('account service : create');
    return this.http.post(this.baseUrl + 'create', model).pipe(
      map((response: any) => {
        const ticket = response;
        this.stringifiedData = JSON.stringify(response);      
        console.log(this.stringifiedData + ' post method returning ');
      })
    );
  }

  getAccountId() {
    return this.stringifiedData;
  }

  getAllAccounts(){   
      return this.http.get(this.baseUrl + 'getAllAccounts/' ,httpOptions);
    
  }

}