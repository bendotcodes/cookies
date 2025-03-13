import express from 'express';
import serverMiddleware from './src/server';
import cookiesMiddleware from 'universal-cookie-express';

const app = express();

app
  .use('/assets', express.static('dist'))
  .use('/umd', express.static('../universal-cookie/umd'))
  .use(cookiesMiddleware())
  .use(serverMiddleware);

app.listen(8080, function () {
  console.log('Listening on 8080...');
});
