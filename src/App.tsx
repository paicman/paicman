import { Route, Routes } from "react-router-dom";
import HomePage from "./component/homepage";
import { Stack } from "@mui/material";

function App() {
  return (
    <Stack
      direction='column'
      spacing={4}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh", // Ensures the container covers the full height of the viewport
        // backgroundImage: `url(${background})`,
        backgroundSize: "cover", // Ensures the image covers the container
        backgroundRepeat: "no-repeat", // Prevents the image from repeating
        backgroundPosition: "center", // Centers the background image
      }}
    >
      {/* <Header /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Stack>
  );
}

export default App;
