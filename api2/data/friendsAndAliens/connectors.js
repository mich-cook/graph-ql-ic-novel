import mongoose from 'mongoose';
import Sequelize from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

// Mongo connection for friends
const friendConnection = mongoose.createConnection('mongodb://localhost/friends', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const friendSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  sex: { type: String },
  language: { type: String },
  email: { type: String },
  contacts: { type: Array },
});

const Friends = friendConnection.model('friends', friendSchema);


// SQL connection for aliens
const sequelize = new Sequelize('database', /* username */ null, /* password */ null, {
  dialect: "sqlite",
  storage: "./aliens.sqlite"
});

const Aliens = sequelize.define('aliens', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  planet: { type: Sequelize.STRING }
});

// create 10 aliens when server starts
Aliens.sync({ force: true  }).then(() => {
  _.times(10, (i) => {
    Aliens.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
      planet: casual.word
    });
  });
});

export { Friends, Aliens };
