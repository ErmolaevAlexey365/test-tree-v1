const environment = {
  baseUrl: '',
};

switch (process.env.TARGET_ENV) {
  case 'development':
    environment.baseUrl = 'http://localhost:5050/';
    break;

  default:
    throw new Error('TARGET_ENV not defined');
}

export default environment;
