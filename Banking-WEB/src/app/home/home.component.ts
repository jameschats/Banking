import { Component, OnInit } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('gt'));
    if (localStorage.getItem('gt') == null){
     this.route.navigate(['/login']);
      //this.callLogin();
      }
  }

}
