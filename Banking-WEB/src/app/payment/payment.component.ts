import { AccountService } from './../_services/account.service';
import { Component, OnInit } from "@angular/core";
import { PaymentService } from "../_services/payment.service";
import { AlertifyService } from "../_services/alertify.service";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Payment } from "../_models/payment";
import { MatFormFieldModule } from "@angular/material/form-field";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DatePipe } from "@angular/common";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  createPaymentForm: FormGroup;
  payment: Payment;
  loading: any = false;
  Accounts: any;
  nAccountId:any

  constructor(
    private paymentService: PaymentService,
    private alertify: AlertifyService,
    private route: Router,
    public snackBar: MatSnackBar,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.createPaymentForm = new FormGroup({
      transactionDate: new FormControl(""),
      transactionId: new FormControl(""),
      name: new FormControl(""),
      amount: new FormControl("", Validators.required),
      accountId: new FormControl("", Validators.required),
      response: new FormControl("")
    });
    this.getAllAccounts();
    this.resetForm();
    console.log(this.paymentService.paymentMode);
    if (this.paymentService.paymentMode == "view") {
      this.payment = this.paymentService.paymentObj;
      this.nAccountId = this.payment.accountId ;
     // console.log( this.payment.accountId  + ' : ' +  this.payment.name );

    //  setTimeout(() => {
       this.createPaymentForm.patchValue({ accountId: this.payment.accountId });
       this.createPaymentForm.patchValue({ name: this.payment.name });
       this.createPaymentForm.patchValue({ amount: this.payment.amount });
       this.createPaymentForm.patchValue({transactionDate: this.formatDate(this.payment.transactionDate)});
       this.createPaymentForm.patchValue({ transactionId: this.payment.transactionId});
       this.createPaymentForm.controls["accountId"].updateValueAndValidity();
    //  }, 2000);
    }
    this.paymentService.paymentMode = "add";
  }

  resetForm() {
    let control: AbstractControl = null;    
    this.createPaymentForm.markAsUntouched();
    this.createPaymentForm.reset();    
  }

  formatDate(date) {
    let dp = new DatePipe(navigator.language);
    let p = "dd-MM-y h:mm:ss"; // YYYY-MM-DD
    let dateFormated = dp.transform(date, p);
    return dateFormated;
  }

  createPayment() {
    let message = "made successfully";
    this.loading = true;
    if (this.createPaymentForm.valid) {
      this.payment = Object.assign({}, this.createPaymentForm.value);
      // console.log(this.payment.transactionId + " before paymentservice create");
      if (this.payment.transactionId !== null) {
        message = "altered or updated successfully";
        this.payment.transactionDate = null;
      }
      this.paymentService.createPayment(this.payment).subscribe(
        () => {
          let myObj = JSON.parse(this.paymentService.getPaymentId());
          let fullmessage =
            "Payment " + message + ". TransactionId : " + myObj.transactionId;
          console.log(myObj.response);
          if (myObj.response === "Amount exceeds the Monthly Limit") {
            fullmessage =
              "Amount exceeds the monthly credit limit. Payment Unsuccessful";
          }
          this.createPaymentForm.patchValue({
            transactionId: myObj.transactionId
          });
          this.createPaymentForm.patchValue({
            transactionDate: this.formatDate(myObj.transactionDate)
          });
          this.snackBar.open(fullmessage, "Close", {
            duration: 5000
          });

          //   this.alertify.success('Payment ' + message + ' : ' + myObj.transactionId);
        },
        error => {
          //this.alertify.error(error);
          this.snackBar.open(error, "Close", {
            duration: 5000
          });
        }
      );
    }
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }


   
  getAllAccounts() {
    
    this.accountService.getAllAccounts().subscribe(
      data => {
        this.Accounts = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
