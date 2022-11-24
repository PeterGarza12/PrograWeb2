const express = require('express');
const routerApi = require('./routes/');
const db = require('./db');
require('dotenv').config();
const cors = require('cors');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const { DBURL } = require('./consts.json');
//HACEMOS LA CONEXIÓN
db(DBURL);

const app = express();
const port = 8080;

//OPCIONES DE LISTA BLANCA (ORIGENES PERMITIDOS) DEL CORS
const whitelist = ['http://localhost:3000'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)|| !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
};

app.use(cors(options));

app.use(
  express.json({
    extended: false, // permite codificar matrices y objetos enriquecidos en formato codificado en url
  })
);

app.use(express.static('storage')); //Sacarlos Recursos estaticos de esta carpeta

app.get('/', (req, res) => res.send('Ruta principal'));

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(port, () => console.log('Mi puerto', port));
