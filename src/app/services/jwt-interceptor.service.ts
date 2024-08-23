import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpHeaders,
  HttpClient,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap, finalize, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { JWT_REFRESH_TOKEN, JWT_TOKEN } from '../static/token';
@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  initialTotalRequests = 0;
  pendingRequestsCount = 0;

  ignoreToAppendInterceptor: string[] = ['auth/signin','auth/user/exits', 'auth/refresh'];

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Add the authnetication token into the request header
   * If the request from mdo2 then exclude the jwt as a header use JSESSIONID for the same
   * @param req the httprequest ...
   * @param token the jwt token and refresh token
   * @returns return the http request ....
   */
  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isValidRequestForInterceptor(request.url)) {
      this.pendingRequestsCount++;
      this.initialTotalRequests++;
      if (request.headers.has('Skip401Interceptor')) {
        const headers = request.headers.delete('Skip401Interceptor');
        return next.handle(request.clone({ headers }));
      } else {
        const jwtToken = localStorage.getItem('JWT-TOKEN') || '';
        request = this.addToken(request, jwtToken);
        return next.handle(request).pipe(
          finalize(() => {
            this.pendingRequestsCount--;
            if (this.pendingRequestsCount === 0) {
            }
          }),
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              /**
               * Todo: use the below method to set the CSRF cookie when backend starts sending it
               * NOTE: This is not required if the cookie is being set automatically
               * this.cookieExtractor.setToken('YOUR_TOKEN_HERE');
               */
            }
          }),
          catchError((error: HttpErrorResponse) => {
            switch (error.status) {
              case 401:
                return this.handlerFor401(request, next);

              case 403:
                  return this.handlerFor403(request, next, error);

              // case 503:
              // case 0:
              //   return this.handlerFor503(error);
            }
            // notify user here
            return throwError(error);
          })
        );
      }
    }
    return next.handle(request);
  }

  handlerFor401(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next('');
      const refreshToken = localStorage.getItem(JWT_REFRESH_TOKEN);
      const headers: HttpHeaders = new HttpHeaders({
        Skip401Interceptor: '',
        Authorization: `Bearer ${refreshToken}`,
        Timezone : `${ Intl.DateTimeFormat().resolvedOptions().timeZone }`
      });
      return this.http.post<any>(this.authService.jwtRefresh(), '', { observe: 'response', headers }).pipe(
        finalize(() => (this.isRefreshingToken = false)),
        switchMap((resp) => {
          const jwtToken = resp.body[JWT_TOKEN] ? resp.body[JWT_TOKEN] : '';
          const newRefreshToken = resp.body[JWT_REFRESH_TOKEN] ? resp.body[JWT_REFRESH_TOKEN] : '';
          if (jwtToken && newRefreshToken) {
            localStorage.setItem(JWT_TOKEN, jwtToken);
            localStorage.setItem(JWT_REFRESH_TOKEN, newRefreshToken);
            this.tokenSubject.next(jwtToken);
            return next.handle(this.addToken(req, jwtToken));
          }
          this.logout();
          return throwError(new Error('oops! no token'));
        }),
        catchError((error, ca) => {
          if (error && error.status === 401 || error.status===0) {
            this.logout();
          }
          if(error && error.status === 423){
            
          }
          // this.logout();
          // this.matDialog.closeAll();
          return throwError(error);
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addToken(req, token));
        })
      );
    }
  }

  /**
   * While http throw 403 ,
   * Open access denied comman dialog
   * @param req http request url control
   * @param next handler for http request
   */
  handlerFor403(req: HttpRequest<any>, next: HttpHandler, error: HttpErrorResponse) {
    return throwError(new Error('oops! Access denied'));
  }

  handlerFor503(error: HttpErrorResponse) {
    if (error) {
      console.log(error);
      console.log(this.router.url);
      // navigate to that common error page ...
      // if(this.router.url && this.router.url.startsWith('/home/schema/schema-details')) {
      //   this.router.navigate([],{fragment:error?.error?.code});
      // }
      // else {
      //   this.router.navigate(['home','schema','error','state'],{queryParams:{e:`${error.status}`}});
      // }
    }
    return throwError(new Error(error?.error?.message));
  }

  logout() {
    try {
      localStorage.clear();
    } finally {
      this.router.navigate(['auth', 'login'], { queryParams: { returnUrl: this.router.url } });
    }
  }

  isValidRequestForInterceptor(requestUrl: string): boolean {
    for (const address of this.ignoreToAppendInterceptor) {
      if (requestUrl.indexOf(address) !== -1) {
        return false;
      }
    }
    return true;
  }
}
