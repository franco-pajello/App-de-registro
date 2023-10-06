const mongoStore = require('connect-mongo');
const store = mongoStore.create({
  mongoUrl: 'mongodb+srv://francopajelloagustin:AMBgBCU9ctNvHz08@cluster0.unqv01k.mongodb.net/',
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  ttl: 600,
});
module.exports = { store };