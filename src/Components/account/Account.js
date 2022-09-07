import { Typography } from "@mui/material";
import { Container } from "@mui/system"
import AccountSettings from "./AccountSettings";

const Account = () => {
  return (
    <Container sx={{mt: "1em"}}>
      <Typography variant="h5">Account</Typography>
      <br />
      <AccountSettings />
    </Container>
  )
}

export default Account;