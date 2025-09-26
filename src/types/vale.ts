import {Inventario} from "@/types/inventario";
import {EmpleadoAutoriza, EmpleadoEntrega, EmpleadoRecibe} from "@/types/empleado";

export interface Vale {
    id: string;
    nombre: string;
    descripcion: string;
    areaAsignada: string;
    fecha: string;
    fechaEntrega: string;
    fechaDevolucion: string;
    empleadoEntrega: EmpleadoEntrega;
    empleadoRecibe: EmpleadoRecibe;
    empleadoAutoriza: EmpleadoAutoriza;
    inventario: Inventario;
}