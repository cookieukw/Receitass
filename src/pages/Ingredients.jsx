import React, { useEffect, useState } from "react";
import { Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          padding: "16px",
        },
        card: {
          display: "flex",
          marginBottom: "16px",
        },
        cardMedia: {
          width: "150px",
          height: "150px",
        },
        cardContent: {
          flex: "1 0 auto",
        },
      },
    },
  },
});

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fazer o request na API para buscar as receitas
    fetch("/api/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) =>
        console.error("Erro ao obter os dados das receitas:", error)
      );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3}>
        {recipes.map((recipe) => (
          <Grid item xs={12} key={recipe.id}>
            <Card className="card">
              <CardMedia
                className="cardMedia"
                image={recipe.imageUrl}
                title={recipe.title}
              />
              <CardContent className="cardContent">
                <Typography variant="h6" component="h2">
                  {recipe.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" component="p">
                  {recipe.preparation.split("\n").slice(0, 2).join("\n")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </ThemeProvider>
  );
};

export default Home;
