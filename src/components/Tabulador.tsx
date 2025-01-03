import React from "react";
import Tabs from "@mui/material/Tabs";
import { Box, Tab, TextField, Grid2 } from "@mui/material";
import FormularioConsumo from "./FormularioConsumo";
import SumatoriasTotales from "./SumatoriasTotales";
import productosData from "../data/alimentos.json";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Tabulador: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const [cantidades, setCantidades] = React.useState<{ [key: string]: number }>({});
  const [sexo, setSexo] = React.useState("femenino");
  const [edad, setEdad] = React.useState<number | "">("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCantidadChange = (alimento: string, cantidad: number) => {
    setCantidades({ ...cantidades, [alimento]: cantidad });
  };

  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
          <TextField
            id="sexo-usuario"
            select
            label="Sexo"
            defaultValue={"femenino"}
            onChange={(e) => setSexo(e.target.value)}
            fullWidth={true}
            margin="normal"
            slotProps={{
              select: {
                native: true,
              },
            }}
          >
            <option key={"femenino"} value={"femenino"}>
              {"Femenino"}
            </option>
            <option key={"masculino"} value={"masculino"}>
              {"Masculino"}
            </option>
          </TextField>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, xl: 4 }}>
          <TextField
            label="Edad"
            type="number"
            value={edad}
            onChange={(e) => setEdad(Math.max(0, parseInt(e.target.value)))}
            fullWidth
            margin="normal"
          />
        </Grid2>
      </Grid2>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab label="Origen Animal" {...a11yProps(0)} />
        <Tab label="Lácteos" {...a11yProps(1)} />
        <Tab label="Leguminosas y cereales" {...a11yProps(2)} />
        <Tab label="Frutas" {...a11yProps(3)} />
        <Tab label="Verduras" {...a11yProps(4)} />
        <Tab label="Grasas, frutos secos y semillas" {...a11yProps(5)} />
        <Tab label="Enriquecidos y fortificados" {...a11yProps(6)} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <FormularioConsumo
          tipoAlimento="Animales"
          cantidades={cantidades}
          handleChange={handleCantidadChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FormularioConsumo
          tipoAlimento="Lacteos"
          cantidades={cantidades}
          handleChange={handleCantidadChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <FormularioConsumo
          tipoAlimento="Leguminosas"
          cantidades={cantidades}
          handleChange={handleCantidadChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <FormularioConsumo
          tipoAlimento="Frutas"
          cantidades={cantidades}
          handleChange={handleCantidadChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <FormularioConsumo
          tipoAlimento="Verduras"
          cantidades={cantidades}
          handleChange={handleCantidadChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <FormularioConsumo
          tipoAlimento="Semillas"
          cantidades={cantidades}
          handleChange={handleCantidadChange}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <FormularioConsumo
          tipoAlimento="Enriquecidos"
          cantidades={cantidades}
          handleChange={handleCantidadChange}
        />
      </CustomTabPanel>

      <SumatoriasTotales
        cantidades={cantidades}
        productosData={productosData}
        sexo={sexo}
        edad={edad}
      />
    </div>
  );
};

export default Tabulador;
