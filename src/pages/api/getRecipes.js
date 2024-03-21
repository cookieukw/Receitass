import connectDB from "../../db.js";
import Recipe from "../../models/Recipe";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    await connectDB();
    const recipes = await Recipe.find();

    return res.status(200).json(recipes);
  } catch (error) {
    console.error("Erro ao obter as receitas:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}
