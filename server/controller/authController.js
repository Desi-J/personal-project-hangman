const axios = require('axios')

module.exports = {
  login: (req, res) => {
    const {code} = req.query;
    const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code' ,
      redirect_uri: `http://${req.headers.host}/auth/callback`
    };
    function tradeCodeForAccessToken() {
      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
    }

    function tradeAcessTokenForUserInfo(response) {
      console.log('response.data.access.token', response.data.access_token)
      return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${response.data.access_token}`)
    }

    function storeUserInfoInDatabase(response) {
      console.log('user info: ', response.data);
      const user = response.data;
      const db = req.app.get('db');
      return db.get_user([user.sub]).then(users => {
        if(users.length) {
          req.session.user = {
            name: users[0].name,
            email: users[0].email,
            picture: users[0].picture,
            auth0_id: users[0].auth0_id,
          }
          res.redirect('/userdashboard')
        } else {
          return db.create_user([
            user.name,
            user.email,
            user.picture,
            user.sub
          ]).then(newUSers => {
            req.session.user = newUSers[0];
            res.redirect('/userdashboard')
          })
        }
      })
    }

    tradeCodeForAccessToken()
      .catch(error => {
        console.log('error in /auth/callback', error);
        res.status(500).send('tradecodeforaccesstoken FAILED')
      })
    .then(tradeAcessTokenForUserInfo)
      .catch(error => {
        console.log('error in /auth/callback', error);
        res.status(500).send('tradeacesstokenforuserinfo FAILED')
      })
    .then(storeUserInfoInDatabase)
      .catch(error => {
        console.log('error in /auth/callback', error);
        res.status(500).send('storeuserinofindb FAILED')
      })
    .catch(error => {
      console.log('error in /auth/callback', error);
      res.status(500).send('Something went wrong in the server')
    })
  },
    getUser: (req,res) => {
      console.log('getuser works', req.session)
      res.json({ user: req.session.user});
  },

    logout: (req,res) => {
      req.session.destroy();
      res.send();
    }
}