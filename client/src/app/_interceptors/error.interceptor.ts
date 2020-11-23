import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

// The Angular Interceptor was introduced in version 4.3 and is used to handle HTTP responses and requests.
// Interceptors are a unique type of Angular Service that we can implement. 
// Interceptors allow us to intercept incoming or outgoing HTTP requests using the HttpClient. 
// By intercepting the HTTP request, we can modify or change the value of the request.
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private rotuer : Router, private toastr : ToastrService) {}
  //Returns Observable
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if(error) {
          switch(error.status) {
            case 400:
              if(error.error.errors) {
                const modelStateErrors = [];
                for(const key in error.error.errors) {
                  if(error.error.errors[key])
                    modelStateErrors.push(error.error.errors[key])
                }
                //flat() is used to convert "array of arrays" to strings this was introduced in "es2019" added under tsconfig.json / lib array.
                throw modelStateErrors.flat();
              }
              else {
                this.toastr.error(error.statusText, error.status);                
              }
            break;
            case 401:
              this.toastr.error(error.statusText, error.status);
              break;
            case 404:
              this.rotuer.navigateByUrl('/not-found');
              break;
            case 500:
              //To pass error state to the html page component to display the error details there.
              const navigationExtras : NavigationExtras = {state: {error : error.error}}
              this.rotuer.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('something unexpected went wrong!');
              console.log(error);
              break;          
          }
        }
        return throwError(error);
      })            
    );    
  }
}
