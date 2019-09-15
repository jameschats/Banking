import { Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  AbstractControl
} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { AlertifyService } from '../_services/alertify.service';
import { AccountClass } from '../_models/account';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  createAccountForm: FormGroup;
  account: AccountClass;
  loading: any = false;
  constructor(
    private accountService: AccountService,
    private alertify: AlertifyService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createAccountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      monthlyCreditLimit: new FormControl('', Validators.required),
      accountId: new FormControl('')
    });
    this.resetForm();
    console.log(this.accountService.accountMode);
    if (this.accountService.accountMode == 'view') {
      this.account = this.accountService.accountObj;
      this.createAccountForm.patchValue({ accountId: this.account.accountId });
      this.createAccountForm.patchValue({ name: this.account.name });
      this.createAccountForm.patchValue({
        monthlyCreditLimit: this.account.monthlyCreditLimit
      });
    }
    this.accountService.accountMode = 'add';
  }

  resetForm() {   

    let control: AbstractControl = null;
    this.createAccountForm.reset();
    this.createAccountForm.markAsUntouched();
    // Object.keys(this.createAccountForm.controls).forEach(name => {
    //   console.log('reset control : ' + name);
    //   control = this.createAccountForm.controls[name];
    //   control.setErrors(null);
    // });
  }

  createAccount() {
    let message = 'created';
    this.loading = true;
    if (this.createAccountForm.valid) {
      this.account = Object.assign({}, this.createAccountForm.value);
      console.log(this.account + ' before accountservice create');
      if (this.account.accountId !== null) {
        message = 'updated';
      }
      this.accountService.createAccount(this.account).subscribe(
        () => {
          let myObj = JSON.parse(this.accountService.getAccountId());
          this.createAccountForm.patchValue({ accountId: myObj.accountId });
          let fullmessage =
            'Account ' + message + '. AccountId : ' + myObj.accountId;
            
          if (myObj.response === "Account name already exists") {
              fullmessage =
                "Account name already exists. Unsuccessful";
            }

          this.snackBar.open(fullmessage, 'Close', {
            duration: 5000
          });
     
        },
        error => {
          this.snackBar.open(error, 'Close', {
            duration: 5000
          });
        }
      );
    }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
