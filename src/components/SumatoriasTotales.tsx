import React, { useState } from "react";
import { Producto } from "../interfaces/Producto";
import { SumatoriasTotalesProps } from "../interfaces/SumatoriasTotalesProps";
import vitaminasValoresReferencia from "../data/vitaminasValoresReferencia.json";
import {
  Typography,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid2,
  Tooltip,
  IconButton,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const SumatoriasTotales: React.FC<SumatoriasTotalesProps> = ({
  cantidades,
  productosData,
  sexo,
  edad,
}) => {
  const [open, setOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState<{ [key: string]: boolean }>({});

  const totalPorPropiedad = (propiedad: keyof Producto) => {
    return productosData.reduce((total, prod) => {
      const cantidad = cantidades[prod.Alimento] || 0;
      return total + (Number(prod[propiedad]) || 0) * cantidad;
    }, 0);
  };

  const propiedadesNumericas: (keyof Producto)[] = [
    "Vitamina A (mcg RAE)",
    "Vitamina B6 (mg)",
    "Vitamina B9 (mcg)",
    "Vitamina B12 (mcg)",
    "Vitamina C (mg)",
    "Vitamina D (mcg)",
    "Vitamina E (mg)",
    "Vitamina K (mcg)",
    "Hierro (mg)",
    "Magnesio (mg)",
    "Calcio (mg)",
    "Zinc (mg)",
  ];

  const getColor = (propiedad: keyof Producto, total: number) => {
    const referencia = vitaminasValoresReferencia.find(
      (v) =>
        v.nombreVitamina === propiedad &&
        (v.sexo === sexo || v.sexo === "ambos") &&
        Number(edad) >= v.edadMinima &&
        Number(edad) <= v.edadMaxima,
    );
    return referencia && total < referencia.cantidadMinima ? "red" : "black";
  };

  const getTooltipTitle = (propiedad: keyof Producto) => {
    const referencia = vitaminasValoresReferencia.find(
      (v) =>
        v.nombreVitamina === propiedad &&
        (v.sexo === sexo || v.sexo === "ambos") &&
        Number(edad) >= v.edadMinima &&
        Number(edad) <= v.edadMaxima,
    );
    return referencia
      ? `Cantidad mínima: ${referencia.cantidadMinima}, Edad: ${referencia.edadMinima}-${referencia.edadMaxima}, Sexo: ${referencia.sexo}`
      : "";
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = (propiedad: string) => {
    setTooltipOpen({ ...tooltipOpen, [propiedad]: true });
  };

  const handleTooltipClose = (propiedad: string) => {
    setTooltipOpen({ ...tooltipOpen, [propiedad]: false });
  };

  return (
    <Paper elevation={6} sx={{ padding: 2, m: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Sumatorias Totales
      </Typography>
      <Grid2 container spacing={1}>
        {propiedadesNumericas.map((propiedad) => {
          const total = totalPorPropiedad(propiedad);
          const color = getColor(propiedad, total);
          return (
            <Grid2 size={{ xs: 12, md: 6, xl: 4 }} key={propiedad}>
              <ListItem>
                <ListItemText
                  primary={
                    <span>
                      {propiedad}
                      {color === "red" && (
                        <Tooltip
                          title={getTooltipTitle(propiedad)}
                          open={tooltipOpen[propiedad] || false}
                          onClose={() => handleTooltipClose(propiedad)}
                          disableHoverListener
                        >
                          <IconButton
                            onClick={() => handleTooltipOpen(propiedad)}
                            size="small"
                            sx={{ ml: 1 }}
                          >
                            <HelpOutlineIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </span>
                  }
                  secondary={total.toFixed(2)}
                  sx={{
                    "& .MuiTypography-root": { color },
                  }}
                />
              </ListItem>
            </Grid2>
          );
        })}
      </Grid2>
      <Button variant="contained" onClick={handleOpen}>
        Mostrar Valores de Referencia
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Valores de Referencia de Nutrientes</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre Nutriente</TableCell>
                <TableCell>Edad Mínima</TableCell>
                <TableCell>Edad Máxima</TableCell>
                <TableCell>Sexo</TableCell>
                {/* <TableCell>Periodicidad</TableCell> */}
                <TableCell>Cantidad Mínima</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vitaminasValoresReferencia.map((vitamina) => (
                <TableRow key={vitamina.nombreVitamina + vitamina.edadMinima + vitamina.sexo}>
                  <TableCell>{vitamina.nombreVitamina}</TableCell>
                  <TableCell>{vitamina.edadMinima}</TableCell>
                  <TableCell>{vitamina.edadMaxima}</TableCell>
                  <TableCell>{vitamina.sexo}</TableCell>
                  {/* <TableCell>{vitamina.periodicidad}</TableCell> */}
                  <TableCell>{vitamina.cantidadMinima}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default SumatoriasTotales;
