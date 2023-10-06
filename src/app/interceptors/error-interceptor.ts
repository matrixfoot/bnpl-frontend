import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { Injectable } from '@angular/core';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  loading:boolean;
  constructor(
    
    private router: Router,private Auth: TokenStorageService,
  ) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;

          }
          else {
            console.log('this is server side error');
            console.log(error);
            console.log(error.message);
            console.log(error.error);
            errorMsg = `Error Code: ${error.status},  Message: ${JSON.stringify( error.error.error)}`;
            
            console.log(`${JSON.stringify(error)}`);
          }
          if (error.status===415 ){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Un problème est survenu, cliquer sur le bouton pour rafraîchir',
            confirmButtonText: 'Rafaraîchir',
            timer: 30000,
          }).then((result) => {
            if (result.value) {
              this.reloadPage()
            }

          }).catch(() => {
            Swal.fire('Failed!', 'There was something went wrong.');
          })
        }
        else    if (error.status===404 ){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'entité introuvable',
            confirmButtonText: 'ok',
            timer: 30000,
          }).then((result) => {
            if (result.value) {
            }
          }).catch(() => {
            Swal.fire('Failed!', 'There was something went wrong.');
          })
        }
          else{
            this.loading=false;
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: `<strong>${error.error.error}</strong>` ,
            })};
          return throwError(errorMsg);
        })
      )
  }
  reloadPage (){
    setTimeout(() => window.location.reload());
    
    
  }
}