const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/app.json');
const saltRounds = 10;
exports.register = (req, res) => {
  const {
      name,
      email,
      password,
  } = req.body.formData;

  try {
    if (!!name && !!email && !!password) {
      const registration_date = Date.now();
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          throw new Error("There was an error saving your password");
        } else {
          User.create({ name, email, password: hash, registration_date }).then((result) => {
            res.json({user: result});
          }).catch((err) => {
            res.json({error: err});
          })
        }
      });
    } else {
      res.json({
        error: "No data to enter for user"
      })
    }
  } catch (err) {
    res.json({
      error: err
    })
  }
}

// const setToken = () => {

// }

const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash).then(res => res).catch(err => console.log(err));
}

exports.login = (req, res) => {
  const {
    email,
    password
  } = req.body;
  try {
    User.findOne({ email: email }, (err, result) => {
      if (err) {
        res.json({
          error: "Email not found"
        });
      }
      if (!!result) {
        if (!checkPassword(password, result.password)) {
          res.json({
            error: "Invalid password specified"
          })
        } else {
          const expiresIn = 24 * 60 * 60;
          const accessToken = jwt.sign({ id: result._id }, config.jwt_config.secret, {
            expiresIn: expiresIn
          });
          res.status(200).send({
            "user": {
              name: result.name,
              email: result.email
            },
            "access_token": accessToken,
            "expires_in": expiresIn
          });
        }
      }
    })
  } catch (err) {
    res.json({
      error: err
    });
  }
}