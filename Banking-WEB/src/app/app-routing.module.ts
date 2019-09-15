import { LoginComponent } from './login/login.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentsComponent } from './payments/payments.component';
import { PaymentComponent } from './payment/payment.component';
import { AccountComponent } from './account/account.component';
import { PerformersComponent } from './performers/performers.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [  
  {path: 'home', component: HomeComponent},
  {path: 'account', component: AccountComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'payments', component: PaymentsComponent},
  {path: 'performers', component: PerformersComponent},  
]
},
{path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
