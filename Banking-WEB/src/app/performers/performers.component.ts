import { UserParams } from './../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Payment } from '../_models/payment';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { PaymentService } from '../_services/payment.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-performers',
  templateUrl: './performers.component.html',
  styleUrls: ['./performers.component.css']
})
export class PerformersComponent implements OnInit {
 fromDate = new FormControl(new Date());
  toDate = new FormControl(new Date());
 // _fromdate = new Date();
  bsvalueto = new Date();
  bsvaluefrom = new Date();

  payments: Payment[];  
  userParams: UserParams ;
  pagination: Pagination;
  sortDirection: any;
  sortColumn: any;

  constructor(private paymentService : PaymentService, private alertify: AlertifyService,
    private route: Router) {
      this.userParams = {} as UserParams;
      this.sortColumn = 'usage';
      this.sortDirection = 'desc';
     }

  ngOnInit() {
  //toDate = now.getMonth()-1;
  this.bsvaluefrom.setDate(this.bsvaluefrom.getDate() - 30);
  var datePipe = new DatePipe("en-US");
  this.userParams.fromDate =datePipe.transform(this.bsvaluefrom, 'yyyy/MM/dd'); 
  this.userParams.toDate = datePipe.transform(this.bsvalueto, 'yyyy/MM/dd');
    this.paymentService.getPerformers(1, 5, this.userParams)
    .subscribe((res: PaginatedResult<Payment[]>) => {
      this.payments = res.result;
      this.pagination = res.pagination;        
    }, error => {
    console.log('error1');
    this.alertify.error(error);
    });

  }

  search(){
    var datePipe = new DatePipe("en-US");
    this.userParams.fromDate =datePipe.transform(this.bsvaluefrom, 'yyyy/MM/dd'); 
    this.userParams.toDate = datePipe.transform(this.bsvalueto, 'yyyy/MM/dd');
    //this.paymentService.getPerformers(1, 5, this.userParams)
    this.paymentService.getPerformers(1, 5, this.userParams)
    .subscribe((res: PaginatedResult<Payment[]>) => {
      this.payments = res.result;
      this.pagination = res.pagination;        
    }, error => {
    console.log('error1');
    this.alertify.error(error);
    });

  }

  formatDate(date) {
    let dp = new DatePipe(navigator.language);
    //let p = "dd-MM-y"; // YYYY-MM-DD
    let p = "y-MM-dd"; 
    let dateFormated = dp.transform(date, p);
    return date(dateFormated);
  }

  
loadPayments() {
  var datePipe = new DatePipe("en-US");
    this.userParams.fromDate =datePipe.transform(this.bsvaluefrom, 'yyyy/MM/dd'); 
    this.userParams.toDate = datePipe.transform(this.bsvalueto, 'yyyy/MM/dd');
  this.paymentService.getPerformers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<Payment[]>) => {
      this.payments = res.result;
      this.pagination = res.pagination;
  }, error => {
    this.alertify.error(error);
  });
}

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPayments();
  }

  pagesizeChanged(event: any): void {
    this.pagination.itemsPerPage = event.target.value;    
    this.loadPayments();
  }

  viewPayment(payment:any)
  {
    this.paymentService.paymentObj = payment;
    this.paymentService.paymentMode = 'view';
    this.route.navigate(['/payment']);
  }

  sortTable(event: any) {
    console.log('clicked : ' + event.target.innerText);

    console.log(
      this.userParams.sortColumn + ' : ' + this.userParams.sortDirection
    );
    if (
      this.sortColumn === undefined ||
      this.sortColumn !== event.target.attributes['sortable-column'].value
    ) {
      this.sortDirection = 'desc';
    } else {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc';
    }
    this.sortColumn = event.target.attributes['sortable-column'].value;
    this.userParams.sortColumn = this.sortColumn;
    this.userParams.sortDirection = this.sortDirection;    
    this.loadPayments();
  }


}
