// http://localhost:8000/api/v1, https://beta.colloafrica.com/api/v1

export const environment = {
  production: window.location.hostname == 'app.colloafrica.com' ? true : false,
  API_BASE_URL: window.location.hostname == 'app.colloafrica.com' ? 'https://live-server.colloafrica.com/api/v1' : 'http://localhost:8000/api/v1',
};