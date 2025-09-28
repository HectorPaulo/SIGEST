// ? ----------------------> Usuarios <----------------------
import {User, UserInsert} from "@/types/user";
import axios from "axios";

// * Función para crear un usuario
export const CreateUser = async (data: UserInsert) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/create`, data);
    return response.data;
};

// * Función para actualizar un usuario
export const UpdateUser = async (email: string, data: User) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/usaurios/update?email=${email}`, data);
    return response.data;
};

// * Función para obtener todos los usuarios
export const GetAllUsers = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/find-all`;
    console.log('GetAllUsers: token', token);
    console.log('GetAllUsers: url', url);
    if (!token) throw new Error('No token found');
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
    console.log("Usuarios en el sistema: ", response.data);
    return response.data;
};

// * Función para obtener un usuario por ID
export const GetUserById = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/find-by-id?id=${id}`);
    return response.data;
};

// * Función para obtener un usuario por correo electrónico
export const GetUserByEmail = async (email: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/find-by-email?email=${email}`);
    return response.data;
};

// * Función para eliminar un usuario
export const DeleteUser = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/delete?id=${id}`);
    return response.data;
};