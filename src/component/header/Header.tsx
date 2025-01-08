import { AppBar, Toolbar, Typography, Box, Link } from "@mui/material";
import { styled } from "@mui/system";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom"; // Import RouterLink from react-router-dom

const Header: FC = () => {
  return (
    <AppBar
      position='static'
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Link component={RouterLink} to='/' style={{ textDecoration: "none" }}>
          <Typography
            variant='h6'
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              color: "#cd7f32",
              fontSize: "40px",
              opacity: "0.7",
              fontFamily: "'Brownstone', serif",
            }}
          >
            AIfrica
          </Typography>
        </Link>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3, ml: "auto" }}>
          <StyledLink href='/'>Home</StyledLink>
          <StyledLink href='/ask-aifrica'>Ask AIfrica</StyledLink>
          <StyledLink href='https://github.com/AIfrica-Sol'>
            About Us
          </StyledLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "#cd7f32",
  fontSize: "22px",
  fontWeight: "500",
  position: "relative",
  "&:hover": {
    color: "#cd7f32",
  },
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -3,
    left: 0,
    width: 0,
    height: "2px",
    backgroundColor: "wheat",
    transition: "width 0.3s ease",
  },
  "&:hover:after": {
    width: "100%",
  },
}));
