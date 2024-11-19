import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAuth } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideAnimations(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideAuth({
      config: {
        authority: 'https://keycloak.ahp.id/realms/quantum',
        redirectUrl: 'http://localhost:4200/',
        postLogoutRedirectUri: 'http://localhost:4200/',
        clientId: 'ahplms-beta',
        scope: 'openid profile email offline_access',
        responseType: 'code',
      },
    }),
  ],
};
