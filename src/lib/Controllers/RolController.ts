
import {Rol, RolInsert} from "@/types/rol";
import axios from "axios";

// ? ----------------------> Rol <----------------------
// Función para crear un área
export const CreateRol = async (data: RolInsert) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/rol/create`, data);
    return response.data;
};

// Función para actualizar un área
export const UpdateRol = async (id: number, data: Rol) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/rol/update?id=${id}`, data);
    return response.data;
};

// Función para obtener todas las áreas
export const GetAllRoles = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/rol/find-all`);
    return response.data;
};

// Función para obtener un área por ID
export const GetRolesById = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/rol/find-by-id?id=${id}`);
    return response.data;
};

// Función para eliminar un área
export const DeleteRol = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/rol/delete?id=${id}`);
    return response.data;
};