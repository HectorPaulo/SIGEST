
// ? ----------------------> Áreas <----------------------
// Función para crear un área

import axios from "axios";
import {Inventario, InventarioInsert} from "@/types/inventario";

export const CreateInventario = async (data: InventarioInsert) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/inventario/create`, data);
    return response.data;
};

// Función para actualizar un área
export const UpdateInventario = async (id: number, data: Inventario) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/inventario/update?id=${id}`, data);
    return response.data;
};

// Función para obtener todas las áreas
export const GetAllInventario = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/inventario/find-all`);
    return response.data;
};

// Función para obtener un área por ID
export const GetInventarioById = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/inventario/find-by-id?id=${id}`);
    return response.data;
};

// Función para eliminar un área
export const DeleteInventario = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/inventario/delete?id=${id}`);
    return response.data;
};