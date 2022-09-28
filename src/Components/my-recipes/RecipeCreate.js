import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Container } from '@mui/material';
import RecipeForm from '../forms/RecipeForm';

const RecipeCreate = (props) => {
  const { open, setOpenCreate, Transition, newRecipeId } = props;

  const handleClose = () => {
    setOpenCreate(false);
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'sticky' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Create new recipe
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{mt: "1em"}}>
        <RecipeForm
          newRecipeId={newRecipeId}
          setOpenCreate={setOpenCreate}
        />
      </Container>
    </Dialog>
  );
}

export default RecipeCreate;