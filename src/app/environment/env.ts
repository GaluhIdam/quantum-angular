import { ConfigDTO } from '@quantum/fui';
import { EnvironmentInterface } from './env.interface';

/** Config for rest api connection */
export const environment: EnvironmentInterface = {
  role: 'admin',
  httpUrl: 'https://quantum-api-dummy.vercel.app/api',
  // httpUrl: 'http://localhost:3001/api',
  keycloakUrl: '',
  keycloakClientId: '',
  baseUrl: '',
  production: false,
  localKey: '',
  realm: '',
  channel: '',
  channelUrlSocketConnect: '',
  channelUrlSocketSend: '',
};

/** Config for keycloak */
export const keycloak: ConfigDTO = {
  authorization_endpoint:
    'https://keycloak.ahp.id/realms/quantum/protocol/openid-connect/auth',
  client_id: 'quantum-api',
  client_secret: 'gLdD6bgYf1O95JJmy0gckW6FkWQ1t5QM',
  redirect_uri: 'http://localhost:4200/',
  response_type: 'id_token token',
  scope: 'openid email profile roles',
  authWellknownEndpointUrl:
    'https://keycloak.ahp.id/realms/quantum/.well-known/openid-configuration',
  storageUsage: 'cookie',
};
