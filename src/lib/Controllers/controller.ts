import {
  ref
} from "firebase/storage";
import { storage } from "../firebase";

// ----------------------> Referencia para las imágenes de perfil <----------------------
export const profileImgRef = (filename: string) => ref(storage, `imgPerfiles/${filename}`);
// NOTE => uso de la referencia: const imgRef = profileImgRef('uniqueUserId');