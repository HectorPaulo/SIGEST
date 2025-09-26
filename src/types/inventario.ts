export interface InventarioInsert {
  nombre: string;
  numeroSerie: string;
  marca: string;
  modelo: string;
  descripcion: string;
  fechaAlta: string;
  fechaBaja?: string;
}

export interface Inventario {
    id: string;
    nombre: string;
    numeroSerie: string;
    marca: string;
    modelo: string;
    descripcion: string;
    fechaAlta: string;
    fechaBaja: string;
}
