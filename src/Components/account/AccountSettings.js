import { Container } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import { UserAuth } from "../../Contexts/AuthContext";

const AccountSettings = () => {
  const { user } = UserAuth();

  return (
    <Container>
      <Typography variant="h5">Account information</Typography>
      <Divider />
      <Typography variant="h6">Email:</Typography><Typography variant="body2">{user?.email}</Typography>
      <Typography variant="h6">Name:</Typography><Typography variant="body2">{user?.firstName} {user?.lastName}</Typography>
    </Container>
  )
}

export default AccountSettings;