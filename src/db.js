const mongoose = require("mongoose");

const MONGODB_URI =
  "mongodb+srv://11111111111111:11111111111111@n-library-api.ixyogkh.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};

module.exports = connectDB;
