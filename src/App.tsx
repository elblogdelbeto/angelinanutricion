import { Box } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Tabulador from "./components/Tabulador";
import Titulo from "./components/Titulo";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Box sx={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px" }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/app"
            element={
              <>
                <Titulo />
                <Tabulador />
              </>
            }
          />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
