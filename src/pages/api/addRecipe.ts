import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../db";
import Recipe from "../../models/Recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    await connectDB();

    const { title, ingredients, preparation, imageUrl } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'O campo "title" é obrigatório' });
    }
    if (!ingredients) {
      return res
        .status(400)
        .json({ error: 'O campo "ingredients" é obrigatório' });
    }
    if (!preparation) {
      return res
        .status(400)
        .json({ error: 'O campo "preparation" é obrigatório' });
    }
    if (!imageUrl) {
      return res
        .status(400)
        .json({ error: 'O campo "imageUrl" é obrigatório' });
    }

    const newRecipe = new Recipe({ title, ingredients, preparation, imageUrl });
    await newRecipe.save();

    return res
      .status(201)
      .json({ success: true, message: "Receita adicionada com sucesso" });
  } catch (error) {
    console.error("Erro ao adicionar receita:", error);
    return res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor" });
  }
}
