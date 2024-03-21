const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  preparation: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

let Recipe;

try {
  // Verifica se o modelo já está registrado no Mongoose
  Recipe = mongoose.model("Recipe");
} catch (error) {
  // Se não estiver registrado, define o modelo
  Recipe = mongoose.model("Recipe", recipeSchema);
}

module.exports = Recipe;
