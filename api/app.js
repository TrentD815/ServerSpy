const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.PORT;
const pingRouter = require('./routes/pingRouter');
const { connectToDatabase } = require('./routes/database')
const app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(cors());
//
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', router);
//
// //error handler
// app.use(function(err, req, res) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// //module.exports = app;

app.options('*', cors())
app.use(async function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  const response = await connectToDatabase()
  req.db = response.db
  req.collection = response.collection
  next()
});
app.use(pingRouter)

app.listen(port, () => {
  console.log(`Server started, listening on port: ${port}`)
})
