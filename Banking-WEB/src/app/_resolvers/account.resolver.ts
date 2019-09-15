// import {Injectable} from '@angular/core';
// import {Option} from '../_models/option';
// import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
// import { OptionService } from '../_services/option.service';
// import { Observable, of } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AlertifyService } from '../_services/alertify.service';

// @Injectable()
// export class AccountResolver implements Resolve<Account[]> {
//     pageNumber = 1;
//     pageSize = 5;

//     constructor(private accountService: OptionService, private router: Router,
//         private alertify: AlertifyService) {}

//     resolve(route: ActivatedRouteSnapshot): Observable<Account[]> {
//         return this.accountService.getAccounts(this.pageNumber, this.pageSize).pipe(
//             catchError(error => {
//                 this.alertify.error('Problem retrieving data');
//                 this.router.navigate(['/home']);
//                 return of(null);
//             })
//         );
//     }
// }
