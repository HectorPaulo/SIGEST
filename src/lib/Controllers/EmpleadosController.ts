import axios from "axios";
import { Empleado, EmpleadoInsert } from "@/types/empleado";

// ? ----------------------> Empleados <----------------------

// Función para crear un empleado
export const CreateEmpleado = async (data: EmpleadoInsert) => {
  console.log("=== DEBUG: CreateEmpleado Controller ===");
  console.log("Data being sent:", JSON.stringify(data, null, 2));

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/empleado/create`;

  console.log("URL:", url);
  console.log("Token present:", !!token);

  if (!token) throw new Error("No hay ningun token");

  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Response status:", response.status);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en CreateEmpleado controller:", error);
    if (axios.isAxiosError(error)) {
      console.error("Response status:", error.response?.status);
      console.error("Response data:", error.response?.data);
      console.error("Response headers:", error.response?.headers);
      console.error("Request URL:", error.config?.url);
      console.error("Request data:", error.config?.data);
    }
    throw error;
  }
};

// Función para actualizar un empleado
export const UpdateEmpleado = async (id: number, data: Empleado) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_DISABLE_URL}/empleado/update?id=${id}`;
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
  const url = `${process.env.NEXT_PUBLIC_DISABLE_URL}/empleado/deshabilitar?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
