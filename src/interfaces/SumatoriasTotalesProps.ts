import { Producto } from "./Producto";

export interface SumatoriasTotalesProps {
  cantidades: { [key: string]: number };
  productosData: Producto[];
  sexo: string;
  edad: number | "";
}
