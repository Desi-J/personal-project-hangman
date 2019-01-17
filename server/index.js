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


//SERVER
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
    maxAge: 1000 * 60 * 60 * 24 * 7   //1 week
  }
}));

//MASSIVE
massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
}).catch(error => {
  console.log('error connecting to DB', error);
});


//AUTHCONTROLLER ENDPOINTS
app.get('/auth/callback', authController.login);
app.get('/auth/user-data', authController.getUser);
app.post('/auth/logout', authController.logout);
//WORDS CONTROLLER ENDPOINTS
app.get('/api/words', wordsController.getWords);


//WORDCONTROLLER ENDPOINTS
app.post('/api/words', wordsController.createWord)
app.get('/api/words', wordsController.userWords)
app.delete('/api/words/:id', wordsController.delete)
app.put('/api/words/:id', wordsController.updateWord)

//SERVER (PORT)
const PORT = 4000;
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});