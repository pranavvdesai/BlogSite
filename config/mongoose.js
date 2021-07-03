// require library
const mongoose = require('mongoose');
// connect to db
mongoose.connect('mongodb://localhost/socials_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// aquire the connection
const db = mongoose.connection;
// error
db.on('error', console.error.bind(console, 'connection error:'));
// up and running then print the message
db.once('open', function () {
  console.log('were connected!');
});
