import { Card, Button, Box, CardContent, Typography, CardMedia, Grid } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';


const RecipeListItem = (props) => {
  const { recipe } = props;

  const handleEditClick = () => {
    alert("Edit clicked");
  }
  const handleViewClick = () => {
    alert("View clicked");
  }

  return (
    <Card sx={{ display: 'flex' }} variant="outlined">
      <Grid container>
        <Grid item> 
          <CardMedia
            component="img"
            sx={{ width: 125, height: "100%" }}
            image={recipe.thumbnail_url}
            alt={recipe.thumbnail_alt_text}
          />
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h6">
                {recipe.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {recipe.description.slice(0, 75) + "..."}
                <br />
                Cook time: {recipe.cook_time_minutes} minutes
                <br />
                Public {recipe.isPublic ? <CheckIcon color="success" fontSize="small" /> : <CloseIcon color="error" fontSize="small" />} 
                <br />
                Draft {recipe.isDraft ? <CheckIcon color="success" fontSize="small" /> : <CloseIcon color="error" fontSize="small" />}
              </Typography>
            </CardContent>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Button
              onClick={handleViewClick}
              sx={{ mr: ".5em", mb: ".5em", minWidth: "10em"}}
              variant="contained"
              >View Recipe</Button>
              <Button
              onClick={handleEditClick}
              sx={{ mb: ".5em", minWidth: "10em" }}
              variant="contained"
              >Edit Recipe</Button>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RecipeListItem;