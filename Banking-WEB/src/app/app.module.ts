import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AlertifyService } from './_services/alertify.service';
// import { AccountResolver } from './_resolvers/account.resolver';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatSelectModule, MatSnackBarModule, MatNativeDateModule } from  '@angular/material';
import { MatTableModule, MatInputModule } from '@angular/material' ;
import { MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material';

import { AccountsComponent } from './accounts/accounts.component';
import { PaymentsComponent } from './payments/payments.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { PerformersComponent } from './performers/performers.component';
import { AuthGuard } from './_guards/auth.guard';
// import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
   declarations: [
      AppComponent,      
      LoginComponent,
      HomeComponent,      
      AccountsComponent,    
      PaymentsComponent,
      AccountComponent,
      PaymentComponent,
      PerformersComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      HttpClientModule,
      PaginationModule.forRoot(),
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      // NgxSpinnerModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatSelectModule,
      MatButtonModule,
      MatIconModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule,
      MatFormFieldModule,
      MatExpansionModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatButtonToggleModule,
      MatInputModule,
      ScrollingModule,
      MatSnackBarModule,
      MatAutocompleteModule,
      ReactiveFormsModule,
      MatFormFieldModule
   ],
   providers: [
      AlertifyService,
      // ActionResolver,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
