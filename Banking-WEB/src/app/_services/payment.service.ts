import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../_models/payment';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl = environment.apiUrl + 'payment/';
  paymentMode: any = 'add';
  paymentObj: any;
  stringifiedData: any;
  constructor(private http: HttpClient) {}

  getPayments(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<Payment[]>> {
    const paginatedResult: PaginatedResult<Payment[]> = new PaginatedResult<Payment[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Payment[]>(this.baseUrl , { observe: 'response', params})
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

  createPayment(model: any) {
    console.log('payment service : create');
    return this.http.post(this.baseUrl + 'create', model).pipe(
      map((response: any) => {
        const ticket = response;
        this.stringifiedData = JSON.stringify(response);      
        console.log(this.stringifiedData + ' post method returning ');
      })
    );
  }

  getPaymentId() {
    return this.stringifiedData;
  }

  getPerformers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<Payment[]>> {
    const paginatedResult: PaginatedResult<Payment[]> = new PaginatedResult<Payment[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      params = params.append('SortColumn', userParams.sortColumn);
      params = params.append('SortDirection', userParams.sortDirection);
      params = params.append('FromDate', userParams.fromDate);
      params = params.append('ToDate', userParams.toDate);
    }

    return this.http.get<Payment[]>(this.baseUrl + 'getPerformers/', { observe: 'response', params})
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


}