const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

const AuthModel = mongoose.model('Auth', AuthSchema);

module.expots = AuthModel;