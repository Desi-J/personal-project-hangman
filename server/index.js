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
//HOSTING
app.use( express.static( `${__dirname}/../build` ) );

//STRIPE
const stripe = require('stripe')(process.env.STRIPE_SECRET) //ACTUAL CODE IS IN THE ENV FILE

app.post('/stripe', (req,res) => {
  const {token,amount} = req.body;
  stripe.charges.create({source:token.id,
  amount,
  currency: 'usd',
  description: 'Thank you for your donation'},
  (error, response) =>{
    error
    ? res.status(500).send({error})
    : res.status(200).send({response})
  })
})

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
app.get('/api/admin', wordsController.admin)
app.delete('/api/words/:id', wordsController.delete)
app.put('/api/words/:id', wordsController.updateWord)



//HOSTING
const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})


//SERVER (PORT)
const PORT = 4000;
app.listen(PORT, () => {console.log(`listening on port ${PORT}`)});