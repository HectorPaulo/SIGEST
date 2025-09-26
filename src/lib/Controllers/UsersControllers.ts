// ? ----------------------> Usuarios <----------------------
// * Función para crear un usuario
import {User, UserInsert} from "@/types/user";
import axios from "axios";

export const CreateUser = async (data: UserInsert) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/create`, data);
    return response.data;
};

// * Función para actualizar un usuario
export const UpdateUser = async (email: string, data: User) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/users/update?email=${email}`, data);
    return response.data;
};

// * Función para obtener todos los usuarios
export const GetAllUsers = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/find-all`);
    return response.data;
};

// * Función para obtener un usuario por ID
export const GetUserById = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/find-by-id?id=${id}`);
    return response.data;
};

// * Función para obtener un usuario por correo electrónico
export const GetUserByEmail = async (email: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/find-by-email?email=${email}`);
    return response.data;
};

// * Función para eliminar un usuario
export const DeleteUser = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/users/delete?id=${id}`);
    return response.data;
};