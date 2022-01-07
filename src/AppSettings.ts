export const server = 'http://localhost:41480';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-x434zz9m.us.auth0.com',
  client_id: 'g2yE2C9v2x3lh52fkcmCp4nAo1AzkPT5',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
