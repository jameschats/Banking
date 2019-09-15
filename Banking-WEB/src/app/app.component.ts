import { AlertifyService } from './_services/alertify.service';
import { Component } from '@angular/core';
import { isNgContainer } from '@angular/compiler';
import { Options } from 'selenium-webdriver/chrome';
import { Pagination, PaginatedResult, User } from './_models/pagination';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Banking-WEB';
  userParams: any = {};
  pagination: Pagination;
  loginStatus: any = false;
  name:any;
  image:any='';

  constructor(public authService: AuthService, private route: Router) {
        this.authService.changeEmitted$.subscribe(
        (text:User)=> {       
            this.loginStatus = text.status;
            this.name = text.name;         
        });
}

  

  ngOnit(){
// console.log('app component ng onit');
  }

  logout(){
    this.loginStatus = false;
    localStorage.removeItem('token');
    this.route.navigate(['/login']);
  }

}
