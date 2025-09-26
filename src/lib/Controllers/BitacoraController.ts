// ? -------------------------------- Bitácora --------------------------------

import {app} from "@/lib/firebase";

export const firestore = getFirestore(app);

// * --> Colección de archivos de bitácora
export const bitacoraCollection = collection(firestore, "bitacora");


// * --> Agregar un nuevo documento a la colección de bitácora
import {addDoc, collection, deleteDoc, doc, getDocs, getFirestore} from "firebase/firestore";
import {Bitacora} from "@/types/Bitacora";

export const CreateBitacoraEntry = async (entryData: Bitacora) => {
    const newEntry = await addDoc(bitacoraCollection, { ...entryData });
    return newEntry.id;
};

// * --> Obtener todos los documentos de la colección de bitácora
export const GetAllBitacoraEntries = async () => {
    const querySnapshot = await getDocs(bitacoraCollection);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// NOTE: uso de la función: const file = *obtener el archivo mediante un input de tipo file*;
// subirArchivo(file).then((url) => {
// console.log('URL del archivo subido: ), url);
// }).catch((error) => {
// console.error('Error al subir el archivo: ), error);
// });

// * --> Eliminar un documento de la colección de bitácora
export const DeleteBitacora = async (id: string) => {
    const document = doc(firestore, `bitacora/${id}`);
    await deleteDoc(document);
    console.log(`La entrada de bitácora con ID ${id} ha sido eliminada`);
};
