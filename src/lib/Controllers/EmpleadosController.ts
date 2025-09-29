import axios from "axios";
import { Empleado, EmpleadoInsert } from "@/types/empleado";

// ? ----------------------> Empleados <----------------------

// Función para crear un empleado
export const CreateEmpleado = async (data: EmpleadoInsert) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/empleado/create`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para actualizar un empleado
export const UpdateEmpleado = async (id: number, data: Empleado) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/empleado/update?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener todos los empleados
export const GetAllEmpleados = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/empleado/find-all`;
  if (!token) throw new Error("Token no encontrado");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para obtener un empleado por ID
export const GetEmpleadoById = async (id: number) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/empleado/find-by-id?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Función para eliminar un empleado
export const DeleteEmpleado = async (id: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_DISABLE_URL}/employee/deshabilitar?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
