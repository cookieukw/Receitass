import mongoose from "mongoose";

const MONGODB_URI: string =
  "mongodb+srv://11111111111111:11111111111111@n-library-api.ixyogkh.mongodb.net/";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexão com o MongoDB estabelecida com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
};

export default connectDB;
