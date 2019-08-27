const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new Schema({
  fistName: String,
  lastName: String,
  email: String,
  password: {
    type: String,
    unique: true
  },
  registration_date: Date
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;