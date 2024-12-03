import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private readonly oidcSecurityService: OidcSecurityService) {}

  canActivate(): Observable<boolean> {
    return this.oidcSecurityService.checkAuth().pipe(
      map((loginResponse: LoginResponse) => {
        if (loginResponse.isAuthenticated) {
          return loginResponse.isAuthenticated;
        } else {
          this.oidcSecurityService.authorize();
          return loginResponse.isAuthenticated;
        }
      })
    );
  }
}
