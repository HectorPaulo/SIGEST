import axios from "axios";
import {Area, AreaInsert} from "@/types/area";

// ? ----------------------> Áreas <----------------------

// Función para crear un área
// export const CreateArea = async (data: AreaInsert) => {
//     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/area/create`, data);
//     return response.data;
// };
export const CreateArea = async (data: AreaInsert) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/area/create`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.post(url, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
}

// Función para actualizar un área
export const UpdateArea = async (id: number, data: Area) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/area/update?id=${id}`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.put(url, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Función para obtener todas las áreas
export const GetAllAreas = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/area/find-all`;
    if (!token) throw new Error('Token no encontrado');
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Función para obtener un área por ID
export const GetAreaById = async (id: number) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/area/find-by-id?id=${id}`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Función para eliminar un área
export const DeleteArea = async (id: string) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_DISABLE_URL}/area/deshabilitar?id=${id}`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};