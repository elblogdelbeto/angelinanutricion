import React from "react";
import alimentosData from "../data/alimentos.json";
import { FormularioConsumoProps } from "../interfaces/FormularioConsumoProps";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";

const FormularioConsumo: React.FC<FormularioConsumoProps> = ({
  tipoAlimento,
  cantidades,
  handleChange,
}) => {
  const productosFiltrados = alimentosData.filter((a) => a.Tabla === tipoAlimento);

  return (
    <div>
      <Grid container spacing={2}>
        {productosFiltrados.map((producto, index) => (
          <Grid size={{ xs: 12, md: 6, xl: 4 }} key={index}>
            <TextField
              label={producto.Alimento}
              type="number"
              value={cantidades[producto.Alimento] || ""}
              onChange={(e) =>
                handleChange(producto.Alimento, Math.max(0, parseInt(e.target.value)))
              }
              placeholder="Cantidad"
              fullWidth
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FormularioConsumo;
