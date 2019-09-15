import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';

import { HttpClient } from '@angular/common/http';
import { User } from '../_models/pagination';
import { AlertifyService } from '../_services/alertify.service';
import { MatSnackBar } from '@angular/material';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() onlogin: EventEmitter<any> = new EventEmitter<any>();
  tUser: User;
  model: any = {};

  constructor(private authService: AuthService, 
                private router: Router,         
                private http: HttpClient,
                // private spinner: NgxSpinnerService,
                public snackBar: MatSnackBar,
                private alertify: AlertifyService) { }

  ngOnInit() {
   // this.login();
  }

  // login(){
  // this.callLogin('james','');
  //  this.router.navigate(['/home']);
  // }

//   callLogin(username:any, image:any)
//   {
//     this.tUser = new User();
//     this.tUser.name =username;
//     this.tUser.image=image;
//     this.tUser.status=true;
//     console.log(this.tUser.name);
//    // this.authService.emitChange(this.tUser);
//     this.onlogin.emit(true);
//     console.log('login clicked');
//     this.router.navigate(['/home']);
//   }


register(registerForm) {
  this.authService.register(this.model).subscribe(() => {
    //this.alertify.success('registration successful'); //console.log('registration successful');
    this.model.username = '';
    this.model.password = '';
    this.snackBar.open('User registration successful', 'Close', {
      duration: 5000
    });
    registerForm.reset();
  }, error => {
   // this.alertify.error(error); // console.log(error);
    this.snackBar.open('error', 'Close', {
      duration: 5000
    });
  });
}

login() {    
  //this.spinner.show();
  
  this.authService.login(this.model).subscribe(next => {
   // this.alertify.success('Logged in successfully'); 
   this.snackBar.open('Logged in successfully', 'Close', {
    duration: 5000
  });
  }, error => {
   // console.log(error);
  // this.alertify.error(error);
  this.snackBar.open('Unauthorized. You shall not pass!!!', 'Close', {
    duration: 5000
  });
  }, () => {
    this.router.navigate(['home']);
  });
  setTimeout(() => {
    /** spinner ends after 5 seconds */
    //this.spinner.hide();
}, 700);
}

reset(form){
form.reset();
}

}
