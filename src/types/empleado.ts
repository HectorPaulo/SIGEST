
export interface EmpleadoInsert {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    area: string;
    clave: string;
    rolNombre: string;
    rolClave: number;
}

export interface Empleado {
    id: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    area: string;
    clave: string;    
    rolNombre: string;
    rolClave: number;
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