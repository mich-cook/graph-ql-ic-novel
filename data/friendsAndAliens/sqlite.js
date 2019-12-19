import Sequelize from 'sequelize';
import _ from 'lodash';
import casual from 'casual';

// SQL
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
      firstName: casual._first_name;
      lastName: casual._last_name;
      planet: casual.word;
    });
  });
});

export { Aliens };
