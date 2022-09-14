import { Box, Card, CardContent, Typography, Avatar, Button, Divider, Paper} from "@mui/material"
import { UserAuth } from "../../Contexts/AuthContext";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const ProfileCard = (props) => {
  const { user } = UserAuth();
  const { toggleProfile } = props;

  return (
    <Box display="inline-block" sx={{width: 1}}>
      <Paper elevation={4}>
        <Card>
          <CardContent>
            <Avatar 
              sx={{height: "5em", width: "5em", m: "auto", mb: ".5em"}} 
              src={user.photoURL}
            />
            <Typography 
              variant="subtitle1" 
              align="center" 
              sx={{fontWeight: "500"}}
            >
              {user?.firstName} {user?.lastName}
            </Typography>
            <Divider />
          </CardContent>
          {(toggleProfile) ? (
            <Box sx={{mx: ".5em", mb: ".5em"}}>
              <Button 
                onClick={() => toggleProfile(true)} 
                startIcon={<AccountCircleIcon />} 
                sx={{mb: ".5em"}}
                size="small" 
                variant="outlined" 
                fullWidth
              >
                Account
              </Button>
              <br />
              <Button 
                onClick={() => toggleProfile(false)} 
                startIcon={<SettingsIcon />} 
                size="small" 
                variant="outlined" 
                fullWidth
              >
                Settings
              </Button>
            </Box>
          ) : (
            null
          )}
        </Card>
      </Paper>
    </Box>
  )
}

export default ProfileCard;