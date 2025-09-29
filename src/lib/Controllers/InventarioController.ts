import axios from "axios";
import { Inventario, InventarioInsert } from "@/types/inventario";

// ? ----------------------> Inventario <----------------------

// Función para crear un inventario
export const CreateInventario = async (data: InventarioInsert) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/inventario/create`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para actualizar un inventario
export const UpdateInventario = async (id: number, data: Inventario) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/inventario/update?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener todos los inventarios
export const GetAllInventario = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/inventario/find-all`;
  if (!token) throw new Error("Token no encontrado");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener un inventario por ID
export const GetInventarioById = async (id: number) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/inventario/find-by-id?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para eliminar un inventario
export const DeleteInventario = async (id: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_DISABLE_URL}/inventario/deshabilitar?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
