import { ConfigDTO } from '@quantum/fui';
import { EnvironmentInterface } from './env.interface';

/** Config for rest api connection */
export const environment: EnvironmentInterface = {
  role: 'admin',
  httpUrl: 'http://localhost:8081/api/v1',
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
    'http://localhost:8080/realms/quantum-demo/protocol/openid-connect/auth',
  client_id: 'quantum-client',
  redirect_uri: 'http://localhost:4200',
  response_type: 'id_token token',
  scope: 'openid email profile roles',
  authWellknownEndpointUrl:
    'http://localhost:8080/realms/quantum-demo/.well-known/openid-configuration',
  storageUsage: 'session',
};
