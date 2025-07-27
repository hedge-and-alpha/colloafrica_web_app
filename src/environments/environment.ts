export const environment = {
  API_BASE_URL: window.location.hostname == 'app.colloafrica.com' ? 'https://live-server.colloafrica.com/api/v1' : 'https://beta.colloafrica.com/api/v1',
  production: window.location.hostname == 'app.colloafrica.com' ? true : false,
};
