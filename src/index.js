const app    = require('./app');
const myIp   = require('ip');
const config = require('./config/config');

const hostname = myIp.address();
const port = config.port;

app.listen(port, () => {
  console.log(`Desafío - API run ${hostname} port ${port}`);
});
