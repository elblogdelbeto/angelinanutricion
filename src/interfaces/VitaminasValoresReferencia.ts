export interface VitaminasValoresReferencia {
  nombreVitamina: string;
  edadMinima: number;
  edadMaxima: number;
  sexo: "masculino" | "femenino" | "ambos";
  periodicidad: string;
  cantidadMinima: number;
}
