export interface Formation {
  id: number;
  asunto: string;
  entidad: string;
  descripcion: string;
  fecha_inicio: string; // Date string from JSON/DB
  fecha_fin: string; // Date string from JSON/DB
  enlace: string;
  oculta: boolean;
}
