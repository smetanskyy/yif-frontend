import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.auth.getToken()}`),
        });
        return next.handle(modifiedReq).pipe(
            catchError(error => {
                this.auth.logout();
                this.router.navigate(['/client', 'login'])
                return throwError(error);
            })
        );
    }
}