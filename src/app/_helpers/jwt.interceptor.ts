import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

    public apiUrl = environment.apiUrl;    
    constructor() { } 

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const token = localStorage.getItem("jwtToken");
        const isLoggedIn = currentUser && token;        
        const isApiUrl = request.url.startsWith(environment.apiUrl);        
       
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {                    
                    Authorization: `Bearer ${token}`
                }
            });
        }
          

        return next.handle(request);
    }
}