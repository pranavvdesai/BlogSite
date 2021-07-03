const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const User = require('./models/user');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware')

var expressLayouts = require('express-ejs-layouts');
const { debug } = require('console');

app.use(sassMiddleware({
  src: '/assets/scss',
  dest: '/assets/css',
  debug: true,
  outputStyle: 'extended',
  


}))
app.use(express.urlencoded());

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets'))
app.use(expressLayouts);

app.set('layout extractScripts', true);

// mongo store is used to store the session cookie in the db
app.use(
  session({
    name: 'pranav',
    secret: 'choot',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: 'mongodb://localhost/socials_db',
        autoRemove: 'disabled',
      },
      (err) => {
        console.log(err || 'connect-mongodb setup ok');
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// for user --> views
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes/index'));

app.listen(port, (err) => {
  if (err) {
    console.log(` Error in running the server : ${err}`);
  }

  console.log(` Server is running on port : ${port}`);
});