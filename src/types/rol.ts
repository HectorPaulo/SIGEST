export interface RolInsert {
    clave: number;
    nombre: string;
    descripcion?: string;
}

export interface Rol {
    id: string;
    clave: number;
    nombre: string;
    descripcion: string;
}