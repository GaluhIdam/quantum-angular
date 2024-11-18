import { ConfigDTO } from '@quantum/fui';
import { EnvironmentInterface } from './env.interface';

/** Config for rest api connection */
export const environment: EnvironmentInterface = {
  role: 'admin',
  httpUrl: 'https://quantum-api-dummy.vercel.app/api',
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


export const keycloak: ConfigDTO = {
  authorization_endpoint:
    'https://keycloak.ahp.id/realms/quantum/protocol/openid-connect/auth',
  client_id: 'ahplms-beta',
  redirect_uri: 'http://localhost:4200',
  response_type: 'id_token token',
  scope: 'openid email profile roles',
  authWellknownEndpointUrl:
    'https://keycloak.ahp.id/realms/quantum/.well-known/openid-configuration',
  storageUsage: 'local',
};
