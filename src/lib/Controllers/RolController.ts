
import {Rol, RolInsert} from "@/types/rol";
import axios from "axios";

// ? ----------------------> Rol <----------------------

// Función para crear un rol
export const CreateRol = async (data: RolInsert) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rol/create`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Función para actualizar un rol
export const UpdateRol = async (id: number, data: Rol) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rol/update?id=${id}`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.put(url, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Función para obtener todos los roles
export const GetAllRoles = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rol/find-all`;
    if (!token) throw new Error('Token no encontrado');
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log(response.data);
    return response.data;
};

// Función para obtener un rol por ID
export const GetRolesById = async (id: number) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rol/find-by-id?id=${id}`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Función para eliminar un rol
export const DeleteRol = async (id: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_DISABLE_URL}/rol/deshabilitar?id=${id}`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};