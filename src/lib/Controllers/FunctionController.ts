import axios from "axios";
import {Funcion, FuncionInsert} from "@/types/funcion";

// ? ----------------------> Funciones <----------------------
// Función para crear un área
export const CreateFuncion = async (data: FuncionInsert) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/funcion/create`, data);
    return response.data;
};

// Función para actualizar un área
export const UpdateFuncion = async (id: number, data: Funcion) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/funcion/update?id=${id}`, data);
    return response.data;
};

// Función para obtener todas las áreas
export const GetAllFunciones = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/funcion/find-all`);
    return response.data;
};

// Función para obtener un área por ID
export const GetFuncionesById = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/funcion/find-by-id?id=${id}`);
    return response.data;
};

// Función para eliminar un área
export const DeleteFuncion = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/funcion/delete?id=${id}`);
    return response.data;
};