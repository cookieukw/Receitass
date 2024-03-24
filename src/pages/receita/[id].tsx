import React, { useEffect, useState, useCallback, useMemo } from "react";
import Loader from "../../components/Loader";
import {
    Container,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    AppBar,
    Toolbar,
    Divider
} from "@mui/material";
import { useRouter } from "next/router";

interface IRecipe {
    _id: string;
    title: string;
    description: string;
    preparation: string;
    ingredients: string;
    imageUrl: string;
}

const Recipe: React.FC = () => {
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const router = useRouter();
    const { id } = router.query;

    const validId = useMemo(() => (typeof id === "string" ? id : ""), [id]);

    const fetchRecipe = useCallback(async () => {
        if (validId) {
            try {
                const response = await fetch(`/api/getRecipe/${validId}`);
                const data: IRecipe = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error("Erro ao obter os dados da receita:", error);
            }
        }
    }, [validId]);

    useEffect(() => {
        fetchRecipe();
    }, [fetchRecipe]);

    const handleBack = useCallback(() => {
        router.push("/receitas");
    }, [router]);

    if (!recipe) {
        return <Loader />;
    }

    return (
        <Container maxWidth="md" sx={{ height: "100vh", padding: "10px" }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        {recipe.title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Card
                sx={{
                    padding: "50px 18px",
                    minHeight: "70%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    boxSizing: "border-box"
                }}
            >
                <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    style={{
                        height: "150px",
                        width: "85%",
                        background: "black",
                        borderRadius: "15px",
                        boxSizing: "border-box",
                        margin: "auto"
                    }}
                />
                <CardContent
                    sx={{
                        padding: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        boxSizing: "border-box"
                    }}
                >
                    <Typography variant="h4" component="div">
                        {recipe.title}
                    </Typography>
                    <Typography
                        sx={{ fontSize: "17px" }}
                        color="text.secondary"
                    >
                        Descrição:
                        {recipe.description?.split("\n").join("\n")}
                    </Typography>
                    <Divider />
                    <Typography
                        sx={{ fontSize: "17px" }}
                        color="text.secondary"
                    >
                        Ingredientes:
                        {recipe.ingredients?.split("\n").join("\n")}
                    </Typography>
                    <Divider />
                    <Typography
                        sx={{ fontSize: "17px" }}
                        color="text.secondary"
                    >
                        Preparação:
                        {recipe.preparation?.split("\n").join("\n")}
                    </Typography>
                </CardContent>
            </Card>
            <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                sx={{ maxWidth: "100%", margin: 2 }}
            >
                Voltar para a Home
            </Button>
        </Container>
    );
};

export default Recipe;
