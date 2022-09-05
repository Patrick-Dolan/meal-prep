import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";


const RecipeCard = (recipe) => {
  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h4">{recipe.name}</Typography>
          <CardMedia component="img" height="194" src={`${recipe.thumbnail_url}`} alt={recipe.thumbnail_alt_text} />
          <Typography variant="body2">{recipe.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined">more info</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default RecipeCard;