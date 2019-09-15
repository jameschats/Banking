import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PaginatedResult, User } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  loginStatus = false;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  @Output() onlogin: EventEmitter<any> = new EventEmitter<any>();
  tUser: User;
  
  constructor(private http: HttpClient, private authService: AuthService) {
    
  }
  
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(user: User) {
      this.emitChangeSource.next(user);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);        
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
          this.tUser = new User();
          this.tUser.name =this.decodedToken.unique_name;
          this.tUser.status=true;
          console.log(this.tUser.name);
          //this.authService.emitChange(this.tUser);
          this.emitChangeSource.next(this.tUser);
          this.onlogin.emit(true);
        }
      })
    );
  }


  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    //this.strloggedin = true;
    var token = localStorage.getItem('token');
    console.log(!this.jwtHelper.isTokenExpired(token));
    return !this.jwtHelper.isTokenExpired(token);
  }

  

}