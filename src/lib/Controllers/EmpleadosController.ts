import axios from "axios";
import {Empleado, EmpleadoInsert} from "@/types/empleado";


// ? ----------------------> Áreas <----------------------
// Función para crear un área

export const CreateEmpleado = async (data: EmpleadoInsert) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/create`, data);
    return response.data;
};

// Función para actualizar un área
export const UpdateEmpleado = async (id: number, data: Empleado) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/update?id=${id}`, data);
    return response.data;
};

// Función para obtener todas las áreas
export const GetAllEmpleados = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/find-all`);
    return response.data;
};

// Función para obtener un área por ID
export const GetEmpleadoById = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/find-by-id?id=${id}`);
    return response.data;
};

// Función para eliminar un área
export const DeleteEmpleado = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/delete?id=${id}`);
    return response.data;
};