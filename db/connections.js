const mongoose = require("mongoose");

const connectMongo = async () => {
  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

module.exports = {
  connectMongo,
};
