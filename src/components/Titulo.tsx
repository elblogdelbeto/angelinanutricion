import React from "react";
import { Typography, Box } from "@mui/material";

const Titulo: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#3f51b5",
          textAlign: "center",
          fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
        }}
      >
        Formulario de Alimentos
      </Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{
          color: "#757575",
          textAlign: "center",
          maxWidth: "800px",
          fontSize: { xs: "1rem", sm: "2rem", md: "2rem" },
        }}
      >
        Test para evaluar si consumes la cantidad recomendada de vitaminas y minerales.
      </Typography>
    </Box>
  );
};

export default Titulo;
