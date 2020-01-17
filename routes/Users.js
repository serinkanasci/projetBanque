const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Banker = require('../models/Banker');
const Transfer = require('../models/Transfer');
const Account = require('../models/Account');


users.use(cors());

process.env.SECRET_KEY = 'secret';

users.post('/user_register', (req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mailadress: req.body.mailadress,
    passworduser: req.body.passworduser,
    adress: req.body.adress,
    phonenumber: req.body.phonenumber
  }

  User.findOne({
    where: {
      mailadress: req.body.mailadress
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.passworduser, 10, (err, hash) => {
          userData.passworduser = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.mailadress + ' Registered!' });
            })
            .catch(err => {
              res.send('error: ' + err);
            })
        })
      } else {
        res.json({ error: 'User already exists' });
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})





users.post('/user_login', (req, res) => {
  User.findOne({
    where: {
      mailadress: req.body.mailadress
    }
  })
    .then(user => {
      if (user) {
         console.log("ok1"+'\n'+req.body.passworduser+'\n'+user.passworduser);
        if (bcrypt.compareSync(req.body.passworduser, user.passworduser)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440000
          })
          res.send(token);
        }
        else{
        	res.status(401).json({ error: 'Password does not exist' });
        }
    	}
       else {
        res.status(400).json({ error: 'User does not exist' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    })
})

users.get('/user_profile', (req, res) => {
  console.log(req.headers['authorization']);
  let bearer = req.headers['authorization'];
  if(bearer.startsWith('Bearer ')){
      let test = bearer.replace('Bearer ','');

      console.log('test : '+test);
      var decoded = jwt.verify(test, process.env.SECRET_KEY);
  }
  else{
      var decoded = jwt.verify(bearer, process.env.SECRET_KEY);
  }


  User.findOne({
    where: {
      iduser: decoded.iduser
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.post('/banker_register', (req, res) => {
  const userData = {
    userid: req.body.userid,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    mailadress: req.body.mailadress,
    passwordbanker: req.body.passworduser
  }

  Banker.findOne({
    where: {
      mailadress: req.body.mailadress
    }
  })
    //TODO bcrypt
    .then(banker => {
      if (!banker) {
        bcrypt.hash(req.body.passwordbanker, 10, (err, hash) => {
          userData.passwordbanker = hash;
          Banker.create(userData)
            .then(banker => {
              res.json({ status: banker.mailadress + ' Registered!' });
            })
            .catch(err => {
              res.send('error: ' + err);
            })
        })
      } else {
        res.json({ error: 'Banker already exists' });
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})





users.post('/banker_login', (req, res) => {
  Banker.findOne({
    where: {
      mailadress: req.body.mailadress
    }
  })
    .then(banker => {
      if (banker) {
        if (bcrypt.compareSync(req.body.passwordbanker, banker.passwordbanker)) {
          let token = jwt.sign(banker.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440000
          })
          res.send(token);
        }
        else{
          res.status(401).json({ error: 'Password does not exist' });
        }
      }
       else {
        res.status(400).json({ error: 'Banker does not exist' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    })
})

users.get('/banker_profile', (req, res) => {
  let bearer = req.headers['authorization'];
  if(bearer.startsWith('Bearer ')){
      let test = bearer.replace('Bearer ','');
      var decoded = jwt.verify(test, process.env.SECRET_KEY);
  }
  else{
      var decoded = jwt.verify(bearer, process.env.SECRET_KEY);
  }


  User.findOne({
    where: {
      bankerid: decoded.bankerid
    }
  })
    .then(banker => {
      if (banker) {
        res.json(banker);
      } else {
        res.send('Banker does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.post('/transfer', (req, res) => {
  const userData = {
    senderid: req.body.senderid,
    receiverid: req.body.receiverid,
    amount: req.body.amount,
    description: req.body.description
  }
  if(req.body.senderid == req.body.receiverid){
    res.send('C\'est débilé');
  }
  else{

    if(Math.sign(req.body.amount)==1){
    Transfer.create(userData)
            .then(transfer => {
              res.json({  Transfer : 'Sended!' });
            })
            .catch(err => {
              res.send('error');
            })
    }
    else{

      res.send('T\'es serieux mon gars ? Mets un nombre positif');

    }

  }
  
})

users.post('/create_account', (req, res) => {
  const today = new Date()
  const userData = {
    iduser: req.body.iduser,
    amount: req.body.amount,
    accountlimit: req.body.accountlimit,
    creationdate: today
  }

  Account.create(userData)
            .then(transfer => {
              res.json({  Account : 'Created!' });
            })
            .catch(err => {
              res.send('error');
            })
})


users.delete('/delete_account', (req, res) => {
  const userData = {
    idaccount: req.body.idaccount
  }

  Account.destroy({
   where: {
       idaccount: req.body.idaccount
   }
}).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
  if(rowDeleted === 1){
     res.json({  Account : 'Deleted!' });
   }
}, function(err){
    res.send('error'); 
});
})


users.get('/get_account/:id', (req, res) => {

  const account = parseInt(req.params.id);


  Account.findOne({
    where: {
      idaccount: account
    }
  })
    .then(account => {
      if (account) {
        res.json(account);
      } else {
        res.send('Account does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})

users.get('/get_user/:id', (req, res) => {

  const account = parseInt(req.params.id);


  User.findOne({
    where: {
      iduser: account
    }
  })
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.send('User does not exist');
      }
    })
    .catch(err => {
      res.send('error: ' + err);
    })
})


module.exports = users;