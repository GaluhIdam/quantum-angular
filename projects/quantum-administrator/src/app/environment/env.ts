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
  authorization_endpoint: 'https://keycloak.ahp.id/realms/quantum',
  client_id: 'ahplms-beta',
  redirect_uri: 'https://quantum-rc.ahp.id/quantum-angular',
  response_type: 'code',
  scope: 'openid profile email offline_access',
  authWellknownEndpointUrl:
    'https://keycloak.ahp.id/realms/quantum/.well-known/openid-configuration',
  storageUsage: 'local',
};
