export const environment = {
  production: true,
  apiUrl: (window.location.hostname === 'localhost') ? 'https://127.0.0.1:8000/api' : 'http://192.168.1.21:8000/api',
  authBaseUrl: (window.location.hostname === 'localhost') ? 'https://127.0.0.1:8000/auth' : 'http://192.168.1.21:8000/auth',

};
