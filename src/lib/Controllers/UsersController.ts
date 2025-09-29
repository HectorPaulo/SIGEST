// ? ----------------------> Usuarios <----------------------
import { User, UserInsert } from "@/types/user";
import axios from "@/lib/axios";

// * Función para crear un usuario
export const CreateUser = async (data: UserInsert) => {
  const response = await axios.post("/user/create", data);
  return response.data;
};

// * Función para actualizar un usuario
export const UpdateUser = async (email: string, data: User) => {
  const response = await axios.put(`/user/update?email=${email}`, data);
  return response.data;
};

// * Función para obtener todos los usuarios
export const GetAllUsers = async () => {
  const response = await axios.get("/user/find-all");
  return response.data;
};

// * Función para obtener un usuario por ID
export const GetUserById = async (id: number) => {
  const response = await axios.get(`/user/find-by-id?id=${id}`);
  return response.data;
};

// * Función para obtener un usuario por correo electrónico
export const GetUserByEmail = async (email: string) => {
  const response = await axios.get(`/user/find-by-email?email=${email}`);
  return response.data;
};

// * Función para eliminar un usuario
export const DeleteUser = async (id: string) => {
  const response = await axios.delete(`/user/deshabilitar?id=${id}`);
  return response.data;
};
