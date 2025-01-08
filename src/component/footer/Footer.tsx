import { Grid, Link, Stack, styled, Typography } from "@mui/material";
import { FC } from "react";
import xLogo from "../../assets/X.svg";
import teleLogo from "../../assets/telegram.svg";
import githubLogo from "../../assets/github.svg";

const StyledTitle = styled(Typography)(() => ({
  fontWeight: "800",
  color: "wheat",
  fontFamily: "'Brownstone', serif",
  opacity: "0.7",
}));

const StyledValue = styled(Typography)(() => ({
  fontWeight: "300",
  color: "white",
  fontFamily: "'Brownstone', serif",
  opacity: "0.7",
}));

const Footer: FC = () => {
  return (
    <Grid container direction='row'>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        <Stack
          direction='row'
          spacing={4}
          sx={{
            paddingTop: "20px",
            paddingBottom: "50px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link href='https://x.com/AIfricaAI'>
            <img
              src={xLogo}
              alt='x-logo'
              style={{ width: "30px", height: "30px" }}
            />
          </Link>
          <Link href=''>
            <img
              src={teleLogo}
              alt='tele-logo'
              style={{ width: "30px", height: "30px" }}
            />
          </Link>
          <Link href='https://github.com/AIfrica-Sol'>
            <img
              src={githubLogo}
              alt='tele-logo'
              style={{ width: "30px", height: "30px" }}
            />
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={3}>
        <Stack direction='row' spacing={1}>
          <StyledTitle>Total $AIFRICA Donation:</StyledTitle>
          <StyledValue>0 $AIFRICA</StyledValue>
        </Stack>
        <Stack direction='row' spacing={1}>
          <StyledTitle>Total $SOL Donation:</StyledTitle>
          <StyledValue>0 $SOL</StyledValue>
        </Stack>
        <Stack direction='row' spacing={1}>
          <StyledTitle>Total $AIFRICA Burned:</StyledTitle>
          <StyledValue>0 $AIFRICA</StyledValue>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Footer;
