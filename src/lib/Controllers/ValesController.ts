import {Vale} from "@/types/vale";
import axios from "axios";

// ? ----------------------> Áreas <----------------------
// Función para crear un área
export const CreateVale = async (data: Vale) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/voucher/create`, data);
    return response.data;
};

// Función para actualizar un área
export const UpdateVale = async (id: number, data: Vale) => {
    const response = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/update?id=${id}`, data);
    return response.data;
};

// Función para obtener todas las áreas
export const GetAllVales = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/find-all`);
    return response.data;
};

// Función para obtener un área por ID
export const GetValeById = async (id: number) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/find-by-id?id=${id}`);
    return response.data;
};

// Función para eliminar un área
export const DeleteVale = async (id: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/delete?id=${id}`);
    return response.data;
};