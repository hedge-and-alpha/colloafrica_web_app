export const environment = {
  production: false,
  API_BASE_URL: window.location.hostname == 'localhost' ? 'http://localhost:8000/api/v1' : 'https://staging-server.colloafrica.com/api/v1',
};
// http://localhost:8000/api/v1, https://beta.colloafrica.com/api/v1
