import 'dotenv/config';
import express from 'express';
import { json, urlencoded } from 'express';
import { join } from 'path';
import morgan from 'morgan';
import errorHandler from 'errorhandler';

const { NODE_ENV, PORT } = process.env;

const app = express();

// Middlewares

app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended: true }));

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
app.listen(port, () => {
  console.log(`Amazing Stuff is Happening on: ${port}`);
});
