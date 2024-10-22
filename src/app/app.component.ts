import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsComponent } from './shared/layouts/layouts.component';
import { RouterModule } from '@angular/router';
import { OidcAuthenticatorService } from '@quantum/fui';
import { keycloak } from './environment/env';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoggingInterceptor } from './core/interceptor/logging-interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LayoutsComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
  ],
})
export class AppComponent {
  constructor(private readonly _authService: OidcAuthenticatorService) {
    /** Callback Handle */
    this._authService.callBackAuth(keycloak);
  }
}
