const express = require('express');
const routerApi = require('./routes/');
const db = require('./db');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const { DBURL } = require('./consts.json');
//HACEMOS LA CONEXIÓN
db(DBURL);

const app = express();
const port = 3000;

app.use(
  express.json({
    extended: false, // permite codificar matrices y objetos enriquecidos en formato codificado en url
  })
);

app.get('/', (req, res) => res.send('Ruta principal'));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(port, () => console.log('Mi puerto', port));
