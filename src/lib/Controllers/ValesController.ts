import { Vale } from "@/types/vale";
import axios from "axios";

// ? ----------------------> Vales <----------------------
// Función para crear un vale
export const CreateVale = async (data: Vale) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/voucher/create`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// Función para actualizar un vale
export const UpdateVale = async (id: number, data: Vale) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/update?id=${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// Función para obtener todos los vales
export const GetAllVales = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/find-all`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// Función para obtener un vale por ID
export const GetValeById = async (id: number) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/find-by-id?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// Función para eliminar un vale
export const DeleteVale = async (id: string) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASE_URL}/vouchers/delete?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};
