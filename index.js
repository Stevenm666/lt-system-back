// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // CONST
// const PORT = 3001;

// // import routers
// const loginRouter = require('./src/router/login');
// const uploadRouter = require('./src/router/upload');
// const usersRouter = require('./src/router/users');
// const productsRouter = require('./src/router/products');
// const remissionRouter = require('./src/router/remission');
// const pdfRouter = require('./src/router/pdf');
// const boxRouter = require('./src/router/box');
// const boxMovementRouter = require('./src/router/box_movement');

// // import middleware
// const middlewareHeaders = require('./src/middlewares/headers');

// // create app
// const app = express();

// // middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// app.use((req, res, next) => middlewareHeaders(req, res, next)) // validate headers
// app.use(express.static('public')); // static image
// app.set('view engine', 'hbs'); // allow hbs files


// // http request
// app.use('/login', loginRouter);
// app.use('/upload', uploadRouter);
// app.use('/users', usersRouter);
// app.use('/products', productsRouter)
// app.use('/remissions', remissionRouter)
// app.use('/pdf', pdfRouter)
// app.use('/box', boxRouter)
// app.use('/box_movement', boxMovementRouter)

// // listen
// app.listen(PORT)


// index.js
const express = require('express')

const app = express()
const PORT = 4000

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/status', (req, res) => {
  res.send('no se que hice xd ')
})

// Export the Express API
module.exports = app