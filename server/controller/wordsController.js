module.exports = {
  getWords: (req,res) => {
    const db = req.app.get('db'); //calling the DB and setting it as a var
    db.read_words().then(words => { //invoking the DB read_words sql file
      console.log('words: ', words)
      res.send(words);
    }).catch(error => {
      console.log('error in readWords: ', error);
      res.status(500).send('wordsController get words error')
    })
  }
}