import React, { useState } from "react";
import productosData from "../data/alimentos.json";

interface Producto {
  Alimento: string;
  "Vitamina A (mcg RAE)"?: number;
  "Vitamina D (mcg)"?: number;
  "Vitamina B6 (mg)"?: number;
  "Vitamina B9 (mcg)"?: number;
  "Vitamina B12 (mcg)"?: number;
  "Hierro (mg)"?: number;
  "Zinc (mg)"?: number;
  Tabla: string;
}

const FormularioConsumo: React.FC = () => {
  const [cantidades, setCantidades] = useState<{ [key: string]: number }>({});

  const handleChange = (alimento: string, cantidad: number) => {
    setCantidades({ ...cantidades, [alimento]: cantidad });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", cantidades);
  };

  const totalPorPropiedad = (propiedad: keyof Producto) => {
    return productosData.reduce((total, producto) => {
      const cantidad = cantidades[producto.Alimento] || 0;
      return total + (producto[propiedad] || 0) * cantidad;
    }, 0);
  };

  const propiedadesNumericas: (keyof Producto)[] = [
    "Vitamina A (mcg RAE)",
    "Vitamina D (mcg)",
    "Vitamina B6 (mg)",
    "Vitamina B9 (mcg)",
    "Vitamina B12 (mcg)",
    "Hierro (mg)",
    "Zinc (mg)"
  ];

  // Agrupar productos por tabla
  const productosAgrupados = productosData.reduce((grupos, producto) => {
    if (!grupos[producto.Tabla]) {
      grupos[producto.Tabla] = [];
    }
    grupos[producto.Tabla].push(producto);
    return grupos;
  }, {} as { [key: string]: Producto[] });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Formulario de Consumo de Alimentos</h1>
        {Object.keys(productosAgrupados).map((tabla) => (
          <div key={tabla}>
            <h2>{tabla}</h2>
            {productosAgrupados[tabla].map((producto, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                <label>{producto.Alimento}</label>
                <input
                  type="number"
                  value={cantidades[producto.Alimento] || ""}
                  onChange={(e) =>
                    handleChange(producto.Alimento, parseInt(e.target.value))
                  }
                  placeholder="Cantidad"
                />
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>

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

export default FormularioConsumo;
