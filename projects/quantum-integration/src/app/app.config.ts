import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { keycloak } from './environment/env';
import { provideAuth } from 'angular-auth-oidc-client';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideAnimations(),
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
