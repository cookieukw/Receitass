import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Container,
} from "@mui/material";
import { useRouter } from "next/router";
import { isValidUrl } from "../../classes/utils";

interface IRecipe {
  _id: string;
  title: string;
  preparation: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/getAllRecipes")
      .then((response) => response.json())
      .then((data: IRecipe[]) => setRecipes(data))
      .catch((error) => {
        console.error("Erro ao obter os dados das receitas:", error);
      });
  }, []);

  const handleViewRecipe = (id: string) => {
    router.push(`/receita/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Receitas
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} justifyContent="center">
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                image={
                  isValidUrl(recipe.imageUrl)
                    ? recipe.imageUrl
                    : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                }
                alt={recipe.title}
                sx={{ flexGrow: 1 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="div">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.preparation.split("\n").slice(0, 2).join("\n")}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleViewRecipe(recipe._id)}
                sx={{ width: "100%" }}
              >
                Ver Receita
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
