const { connect } = require('mongoose');
/* const config = require('../config/config.js');
 *//* const { logger } = require('../logs/logWinston.js'); */
let instance = null;
async function connectMG() {
  try {
    await connect('mongodb+srv://francopajelloagustin:AMBgBCU9ctNvHz08@cluster0.unqv01k.mongodb.net/', {
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log('error', '127.0.0.1 - log error', error);
    throw 'no me conecte';
  }
}

class ConnecToMongo {
  constructor() {
    this.value = connectMG();
  }
  printValue() {
    logger.log('info', 'url de coneccion a localhost', this.value);
  }
  static getInstance() {
    if (!instance) {
      instance = new ConnecToMongo();
    }
    return instance;
  }
}

module.exports = { ConnecToMongo };