module.exports = {
  ///////CREATE///////////
  createWord: (req,res,next) => { 
    const database = req.app.get('db') //SET DATABASE TO A VARIABLE
    const {name, definition} = req.body //VALUES IN THE SQL FILE DESTRUCTURED(INSERT INTO)
    const user_id = req.session.user.auth0_id; //SETS USERID TO THE USER'S AUTH0 SESSION ID
    console.log(user_id)
    database.create_word({name,definition,user_id}) //CALL/USE THE DB'S CREATE WORD SQL FILE PASSING IN THESE VALUES
    .then((word) => res.status(200).send(word)) //IF SUCESSFULL
    .catch(error => {
      res.status(500).send({errorMessage: "Create word error(controller)"}); // IF FAILED 
      console.log(error)
    })
  },
  ///////READ///////////////
  getWords: (req,res) => {
    const db = req.app.get('db'); //calling the DB and setting it as a var
    db.read_words().then(words => { //invoking the DB read_words sql file
      console.log('words: ', words)
      res.status(200).send(words);
    }).catch(error => {
      console.log('error in readWords: ', error);
      res.status(500).send('wordsController get words error')
    })
  },
  //////////READ USER'S WORDS ONLY////////////////
  userWords: (req,res) => {
    const database = req.app.get('db');
    console.log('--------------', req.session.user.auth0_id)

    database.user_words([req.session.user.auth0_id])
    .then(words => {
      console.log('userwords', words)
      res.status(200).send(words) //CAN ONLY DO 1 SEND PER.THEN
    }).catch(error => {
      res.status(500).send('wordscontroller userwords error', error)
    })
  },
  ////////////READ ALL USERS AND WORDS//////////////////
  admin: (req,res) => {
    const database = req.app.get('db')
    database.admin().then(info => {
      console.log('admin res:', res)
      res.send(info)
    }).catch(error => {
      res.status(500).send('admin error', error)
    })
  },
  ////////UPDATE//////////
  updateWord: (req,res) => {
    const database = req.app.get('db')
    const {params,query} = req;
    console.log('update res: ', res)
    // const {name,definition} = req.body
    

    database.update_word([req.body.name,req.body.definition,params.id, req.session.user.auth0_id])
    .then((words) => res.send(words) )
    .catch(error => {
      res.status(500).send({errorMEssage: "update word error sql/controller"});
      console.log('backend', error)
    })
  },
  //////////DELETE/////////
  delete: (req,res) => {
    const database = req.app.get('db');
    const {params} = req;
    const user_id = req.session.user.auth0_id;
    
    database.delete_word([params.id,user_id])
    .then((words) => {
    console.log('words', words)
    res.send(words)
    })
    .catch(error => {
      res.status(500).send({ errorMessage: "delete error"});
      console.log(error)
    })
  }
}