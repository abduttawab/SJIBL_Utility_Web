import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router:Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if(localStorage.getItem('token')!=null){
         
            const cloneReq = req.clone({
                headers:req.headers
                .set('Authorization','Bearer '+localStorage.getItem('token'))
                
            });
            return next.handle(cloneReq).pipe(
                tap(
                    succ=>{},
                    err=>{
                        if(err.status == 401){
                            localStorage.removeItem('token');
                            this.router.navigate(['/user/login']);
                        }else if(err.status == 403){
                            this.router.navigate(['/forbidden']);
                        }
                    }
                )
            )
          }else{

            
            if(localStorage.getItem('EndUserIp')!=null){
                 // Clone the request to add the new header
                const clonedRequest = req.clone({ headers: req.headers.append('EndUserIp', localStorage.getItem('EndUserIp')) });

                return next.handle(clonedRequest);
                
            }
            else{
                return next.handle(req.clone());
            }
           
          }
    }

    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }
  
     
}