const express = require('express'),
      bodyParser = require('body-parser'),
      session = require('express-session'),
      massive = require('massive'),
      dotenv = require('dotenv'),
      wordsController = require('./controller/wordsController'),
      authController = require('./controller/authController'),
      connect = require('connect-pg-simple');

console.log('Hi! ^_^')
dotenv.config();


const app = express();
app.use(bodyParser.json());
//SESSION
app.use(session({
  store: new (connect(session)) ({
    conString: process.env.CONNECTION_STRING
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2  //two weeks
  }
}));

//MASSIVE
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('error connecting to DB', error);
});



//WORDS CONTROLLER ENDPOINTS
//SERVER
app.get('/api/words', wordsController.getWords);


//SERVER (PORT)

const PORT = 4000;
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});