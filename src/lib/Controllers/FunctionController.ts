import axios from "axios";
import { Funcion, FuncionInsert } from "@/types/funcion";

// ? ----------------------> Funciones <----------------------

// Función para crear una función
export const CreateFuncion = async (data: FuncionInsert) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/funcion/create`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para actualizar una función
export const UpdateFuncion = async (id: number, data: Funcion) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/funcion/update?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener todas las funciones
export const GetAllFunciones = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/funcion/find-all`;
  if (!token) throw new Error("Token no encontrado");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener una función por ID
export const GetFuncionesById = async (id: number) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/funcion/find-by-id?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para eliminar una función
export const DeleteFuncion = async (id: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_DISABLE_URL}/funcion/deshabilitar?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
