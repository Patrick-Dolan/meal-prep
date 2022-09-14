import { Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import ProfileCard from "./ProfileCard";
import ProfileInformation from "./ProfileInformation";
import AccountSettings from "./AccountSettings";

const Account = () => {
  const [toggleProfile, setToggleProfile] = useState(true);

  return (
    <Container sx={{mt: "1em"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={3} textAlign="center">
          <ProfileCard toggleProfile={setToggleProfile} />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          {(toggleProfile) ? (
            <ProfileInformation />
          ) : (
            <AccountSettings />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Account;