import React from "react";
import { Producto } from "../interfaces/Producto";
import { SumatoriasTotalesProps } from "../interfaces/SumatoriasTotalesProps";

const SumatoriasTotales: React.FC<SumatoriasTotalesProps> = ({ cantidades, productosData }) => {
  const totalPorPropiedad = (propiedad: keyof Producto) => {
    return productosData.reduce((total, producto) => {
      const cantidad = cantidades[producto.Alimento] || 0;
      return total + (Number(producto[propiedad]) || 0) * cantidad;
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
    "Zinc (mg)",
  ];

  return (
    <div>
      <h2>Sumatorias Totales</h2>
      <ul>
        {propiedadesNumericas.map((propiedad) => (
          <li key={propiedad}>
            {propiedad}: {totalPorPropiedad(propiedad).toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SumatoriasTotales;
