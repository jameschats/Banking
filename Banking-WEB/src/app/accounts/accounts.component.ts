import { ActivatedRoute, Router } from '@angular/router';
import { AccountClass } from './../_models/account';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material' ;
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: AccountClass[];  
  userParams: any = {};
  pagination: Pagination;

  constructor(private accountService : AccountService, private alertify: AlertifyService,
    private route: Router) { }

  ngOnInit() {
   
    this.accountService.getAccounts(1, 5, this.userParams)
      .subscribe((res: PaginatedResult<AccountClass[]>) => {
        this.accounts = res.result;
        this.pagination = res.pagination;        
      }, error => {
      console.log('error1');
      this.alertify.error(error);
      });

  }

  
loadAccounts() {
  this.accountService.getAccounts(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<AccountClass[]>) => {
      this.accounts = res.result;
      this.pagination = res.pagination;
  }, error => {
    this.alertify.error(error);
  });
}

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAccounts();
  }

  pagesizeChanged(event: any): void {
    this.pagination.itemsPerPage = event.target.value;    
    this.loadAccounts();
  }

  viewAccount(account:any)
  {
    this.accountService.accountObj = account;
    this.accountService.accountMode = 'view';
    this.route.navigate(['/account']);
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

