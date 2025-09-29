// ? ----------------------> Usuarios <----------------------
import { User, UserInsert } from "@/types/user";
import axios from "axios";

// * Función para crear un usuario
export const CreateUser = async (data: UserInsert) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/user/create`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// * Función para actualizar un usuario
export const UpdateUser = async (email: string, data: User) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/update?email=${email}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.put(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// * Función para obtener todos los usuarios
export const GetAllUsers = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_USERS_URL}/find-all`;
  if (!token) throw new Error("Token no encontrado");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// * Función para obtener un usuario por ID
export const GetUserById = async (id: number) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/find-by-id?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// * Función para obtener un usuario por correo electrónico
export const GetUserByEmail = async (email: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_API_URL}/find-by-email?email=${email}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// * Función para eliminar un usuario
export const DeleteUser = async (id: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const url = `${process.env.NEXT_PUBLIC_DISABLE_URL}/deshabilitar?id=${id}`;
  if (!token) throw new Error("No hay ningun token");
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
