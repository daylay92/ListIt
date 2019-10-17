import 'dotenv/config';
import "core-js/stable";
import "regenerator-runtime/runtime"
import express from 'express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from 'errorhandler';
import DB from './database';
import routes from './routes';

const { NODE_ENV, PORT } = process.env;

const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));
// if(NODE_ENV === 'development')
app.use(cors());
//routes
routes(app);

//Serve static assets on production

if (NODE_ENV === 'production') {
  const clientDir = join(__dirname, '../client/build');
  app.use(express.static(clientDir));
  app.get('*', (req, res) => res.sendFile(clientDir + 'index.html'));
}
// Handle Errors on dev & test env only
else app.use(errorHandler());

// Handle all Requests not Handled by the above routes
// For server-side use only

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'something is wrong'
  });
});
//set port
const port = PORT || 3000;

//listen for requests
(async () => {
  try {
    const db = await DB.connect();
    const port = PORT || 3000;
    app.listen(port, () => {
      console.log(`Amazing Stuff is Happening on: ${port}`);
    });
    db.on('error', () => {
      console.log(err);
    });
  } catch (err) {
    console.log(err);
  }
})();
