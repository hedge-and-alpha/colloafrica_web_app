export const environment = {
  API_BASE_URL: window.location.hostname == 'localhost' ? 'https://beta.colloafrica.com/api/v1' : 'https://staging-server.colloafrica.com/api/v1',
  // API_BASE_URL: 'https://staging-server.colloafrica.com/api/v1', "http://localhost:8000/api/v1"
  production: false,
};
