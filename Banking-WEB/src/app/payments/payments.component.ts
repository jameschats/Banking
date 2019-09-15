import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { Payment } from '../_models/payment';
import { PaymentService } from '../_services/payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[];  
  userParams: any = {};
  pagination: Pagination;

  constructor(private paymentService : PaymentService, private alertify: AlertifyService,
    private route: Router) { }

  ngOnInit() {
    this.paymentService.getPayments(1, 5, this.userParams)
    .subscribe((res: PaginatedResult<Payment[]>) => {
      this.payments = res.result;
      this.pagination = res.pagination;        
    }, error => {
    console.log('error1');
    this.alertify.error(error);
    });

  }

  
loadPayments() {
  this.paymentService.getPayments(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
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

}
