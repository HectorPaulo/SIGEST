// ? ----------------------> ARCHIVOS <----------------------

// * --> Obtener todos los archivos
// export const getAllArchivos = async () => {
//   try {
//     const response = await axios.get("/api/archivos");
//     return response.data;  // tu array con [ { id, nombre, url, etc. }, ... ]
//   } catch (error) {
//     throw new Error("Error al obtener los archivos");
//   }
// };
// LISTAR “archivos” desde Firestore
import {Archivo} from "@/types/Archivo";
import axios from "axios";
import {doc, getDoc} from "firebase/firestore";
// import {firestore} from "firebase-admin";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
// import {storage} from "@/lib/firebase";
import {CreateBitacoraEntry, GetAllBitacoraEntries} from "@/lib/Controllers/BitacoraController";

export const GetAllArchivos = async (): Promise<Archivo[]> => {
    // asume que getAllBitacoraEntries devuelve [{ id, nombre, url, tipo, tamaño, fechaCreacion }, ...]
    return GetAllBitacoraEntries() as Promise<Archivo[]>;
};

// * --> Subir archivo
// export const uploadArchivo = async (file: File) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const response = await axios.post("/api/archivos", formData, {
//       headers: { "Content-Type": "multipart/form-data" }
//     });
//     return response.data; // metadata del archivo subido
//   } catch (error) {
//     throw new Error("Error al subir el archivo");
//   }
// };
// SUBIR un archivo directamente a Firebase Storage
export const UploadArchivo = async (file: File): Promise<{
    id: any;
    nombre: string;
    url: string;
    tipo: string;
    tamano: string;
    fechaCreacion: string
}> => {
    // 1. Sube a Storage y recibe la URL
    const url = await SubirArchivo(file);
    if (!url) throw new Error("No se obtuvo URL de Firebase");

    // 2. Construye la entrada y la guardas en Firestore
    const entryData = {
        nombre: file.name,
        url,
        tipo: file.type,
        tamano: file.size.toString(),
        fechaCreacion: new Date().toISOString(),
    };
    const id = await CreateBitacoraEntry(entryData);

    // 3. Devuelve el objeto completo
    return { id, ...entryData };
};

// * --> Eliminar archivo
export const DeleteArchivo = async (id: string) => {
    try {
        await axios.delete(`/api/archivos/${id}`);
    } catch (error) {
        throw new Error("Error al eliminar el archivo");
    }
};
// * --> Obtener un documento de la colección de vales por ID
export const GetValeById = async (id: string) => {
    // @ts-ignore
    const document = doc(firestore, `vales/${id}`);
    const docSnap = await getDoc(document);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        throw new Error("Vale no encontrado");
    }
};

// * ----------------------> Subir un archivo a Firebase Storage <----------------------
// export const SubirArchivo = async (file: File): Promise<string | void> => {
//     // Crear una referencia en Firebase Storage en la carpeta 'bitacora' con el nombre del archivo
//     const storageRef = ref(storage, `bitacora/${file.name}`);
//     try {
//         // Subir el archivo a la referencia creada
//         const snapshot = await uploadBytes(storageRef, file);
//         // Obtener la URL de descarga del archivo subido
//         const url = await getDownloadURL(snapshot.ref);
//         console.log('Archivo disponible en: ', url);
//         // Devolver la URL del archivo subido
//         return url;
//     } catch (error) {
//         // Manejar cualquier error que ocurra durante la subida del archivo
//         console.error("Error subiendo el archivo: ", error);
//     }
// };