import Recipe from "@/models/Recipe";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;

  if (!id || typeof id !== "string")
    return res.status(400).json({ message: "ID inválido" });

  if (req.method !== "GET")
    return res.status(405).json({ error: "Método não permitido" });

  try {
    const receita = await Recipe.findById(id);

    if (!receita)
      return res.status(404).json({ message: "Receita não encontrada" });

    res.status(200).json(receita);
  } catch (error: any) {
    res.status(500).json({ message: error });
  }
}
