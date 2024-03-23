import { useState } from "react";
import { Button, TextField, TextareaAutosize, Box } from "@mui/material";

export default function AddRecipe() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [preparation, setPreparation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanIngredients = ingredients.trim();
    const cleanPreparation = preparation.trim();
    const cleanImageUrl = imageUrl.trim();
    const cleanDescription = description.trim();

    if (
      !cleanTitle ||
      !cleanIngredients ||
      !cleanPreparation ||
      !cleanImageUrl ||
      !cleanDescription
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const response = await fetch("/api/addRecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: cleanTitle,
        ingredients: cleanIngredients,
        preparation: cleanPreparation,
        imageUrl: cleanImageUrl,
        description: cleanDescription,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
      return;
    }

    console.log(data.message);

    setTitle("");
    setIngredients("");
    setPreparation("");
    setImageUrl("");
    setDescription("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextareaAutosize
        minRows={3}
        placeholder="Ingredientes"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <TextareaAutosize
        minRows={3}
        placeholder="Preparação"
        value={preparation}
        onChange={(e) => setPreparation(e.target.value)}
      />
      <TextField
        label="URL da imagem"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <TextField
        label="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">
        Adicionar Receita
      </Button>
    </Box>
  );
}
