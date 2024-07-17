import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OidcAuthenticatorService } from '@quantum/fui';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { keycloak } from '../../environment/env';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private readonly router: Router,
    private readonly authService: OidcAuthenticatorService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.checkAuth(keycloak).pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/forbidden']);
        }
      }),
      map((isAuthenticated) => isAuthenticated)
    );
  }
}
