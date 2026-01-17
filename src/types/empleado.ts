export interface EmpleadoInsert {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  clave: string;
  areaId: number;
  rolId: number;
}

export interface Empleado {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  clave: string;
  area: {
    id: number;
    nombre: string;
    descripcion: string;
    deshabilitado: boolean;
  };
  rol: {
    id: number;
    nombre: string;
    descripcion: string;
    deshabilitado: boolean;
  };
  deshabilitado: boolean;
  // Campos adicionales para facilitar la edición
  areaId?: number;
  rolId?: number;
}

export interface EmpleadoRecibe {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface EmpleadoEntrega {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface EmpleadoAutoriza {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}
