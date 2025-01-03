import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: 2,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Bienvenido a Angelina Nutrición
      </Typography>
      <Typography variant="h5" gutterBottom>
        Tu herramienta para el seguimiento nutricional
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/app"
        sx={{ marginTop: 2 }}
      >
        Ir a la Aplicación
      </Button>
    </Box>
  );
};

export default LandingPage;
