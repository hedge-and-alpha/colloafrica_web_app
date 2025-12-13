// http://localhost:8000/api/v1, https://beta.colloafrica.com/api/v1, https://staging-server.colloafrica.com/api/v1

export const environment = {
  production: false,
  API_BASE_URL: window.location.hostname == 'localhost' ? 'http://127.0.0.1:8000/api/v1' : 'https://staging-server.colloafrica.com/api/v1',
};
