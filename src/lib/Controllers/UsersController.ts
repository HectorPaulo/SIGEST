// ? ----------------------> Usuarios <----------------------
import { User, UserInsert } from "@/types/user";
import axios from "@/lib/axios";

// * Función para crear un usuario
export const CreateUser = async (data: UserInsert) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/create`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.post(url, data, {
        headers: {Authorization: `Bearer ${token}`},
    });
  return response.data;
};

// * Función para actualizar un usuario
export const UpdateUser = async (id: string, data: User) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/user/update?id=${id}`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.put(url, data, {
        headers: {Authorization: `Bearer ${token}`},
    });
  return response.data;
};

// * Función para obtener todos los usuarios
export const GetAllUsers = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_USUARIOS}/find-all`;
    if (!token) throw new Error('Token no encontrado');
    const response = await axios.get(url, {
        headers: {Authorization: `Bearer ${token}`},
    });
    console.log(response.data);
    return response.data;
}

// * Función para obtener un usuario por ID
export const GetUserById = async (id: number) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const url = `${process.env.NEXT_PUBLIC_USUARIOS}/find-by-uuid-keycloak?uuidKeycloak=${id}`;
    if (!token) throw new Error('No hay ningun token');
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    })
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
