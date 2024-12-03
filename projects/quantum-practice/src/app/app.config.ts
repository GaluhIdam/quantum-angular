import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAuth } from 'angular-auth-oidc-client';
import { keycloak } from './environment/env';

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
        authority: keycloak.authorization_endpoint,
        redirectUrl: keycloak.redirect_uri,
        postLogoutRedirectUri: keycloak.redirect_uri,
        clientId: keycloak.client_id,
        scope: keycloak.scope,
        responseType: keycloak.response_type,
      },
    }),
  ],
};
