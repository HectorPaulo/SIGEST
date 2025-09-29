// ? ----------------------> ARCHIVOS <----------------------

import { Archivo } from "@/types/Archivo";

// Mock data for development
const mockArchivos: Archivo[] = [
  {
    id: "1",
    nombre: "documento1.pdf",
    tipo: "application/pdf",
    url: "https://example.com/doc1.pdf",
    tamano: "1024KB",
    fechaCreacion: new Date().toISOString(),
  },
  {
    id: "2",
    nombre: "imagen1.jpg",
    tipo: "image/jpeg",
    url: "https://example.com/img1.jpg",
    tamano: "2048KB",
    fechaCreacion: new Date().toISOString(),
  },
];

// * --> Obtener todos los archivos
export const GetAllArchivos = async () => {
  try {
    return {
      data: mockArchivos,
      status: 200,
    };
  } catch (error) {
    console.error("Error fetching archivos:", error);
    throw error;
  }
};

// * --> Obtener un archivo por ID
export const GetArchivoById = async (id: string) => {
  try {
    const archivo = mockArchivos.find((a) => a.id === id);
    if (archivo) {
      return {
        data: archivo,
        status: 200,
      };
    } else {
      throw new Error("Archivo not found");
    }
  } catch (error) {
    console.error("Error fetching archivo:", error);
    throw error;
  }
};

// * --> Crear registro de archivo
export const CreateArchivo = async (archivoData: Omit<Archivo, "id">) => {
  try {
    const newArchivo = {
      id: (mockArchivos.length + 1).toString(),
      ...archivoData,
    };
    mockArchivos.push(newArchivo);

    return {
      data: newArchivo,
      status: 201,
    };
  } catch (error) {
    console.error("Error creating archivo:", error);
    throw error;
  }
};

// * --> Actualizar metadata de archivo
export const UpdateArchivo = async (id: string, data: Partial<Archivo>) => {
  try {
    const index = mockArchivos.findIndex((a) => a.id === id);
    if (index !== -1) {
      mockArchivos[index] = { ...mockArchivos[index], ...data };
      return {
        data: mockArchivos[index],
        status: 200,
      };
    } else {
      throw new Error("Archivo not found");
    }
  } catch (error) {
    console.error("Error updating archivo:", error);
    throw error;
  }
};

// * --> Eliminar archivo
export const DeleteArchivo = async (id: string) => {
  try {
    const index = mockArchivos.findIndex((a) => a.id === id);
    if (index !== -1) {
      mockArchivos.splice(index, 1);
      return {
        data: null,
        status: 200,
      };
    } else {
      throw new Error("Archivo not found");
    }
  } catch (error) {
    console.error("Error deleting archivo:", error);
    throw error;
  }
};

// * --> Subir archivo (mock)
export const UploadArchivo = async (file: File) => {
  try {
    const archivoData: Omit<Archivo, "id"> = {
      nombre: file.name,
      url: `https://example.com/${file.name}`,
      tipo: file.type,
      tamano: `${file.size}B`,
      fechaCreacion: new Date().toISOString(),
    };

    return CreateArchivo(archivoData);
  } catch (error) {
    console.error("Error uploading archivo:", error);
    throw error;
  }
};
