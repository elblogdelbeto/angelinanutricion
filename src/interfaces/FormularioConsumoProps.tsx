export interface FormularioConsumoProps {
  tipoAlimento: string;
  cantidades: { [key: string]: number; };
  handleChange: (alimento: string, cantidad: number) => void;
}
