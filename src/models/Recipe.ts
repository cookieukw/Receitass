import mongoose, { Document, Model } from "mongoose";

interface IRecipe extends Document {
    title: string;
    ingredients: string;
    preparation: string;
    imageUrl: string;
    description: string;
}

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    preparation: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

let Recipe: Model<IRecipe>;

try {
    Recipe = mongoose.model<IRecipe>("receitas");
} catch (error) {
    Recipe = mongoose.model<IRecipe>("receitas", recipeSchema);
}

export default Recipe;
