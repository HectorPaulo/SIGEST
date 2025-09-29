import type { Archivo } from "@/types/Archivo";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  CreateArchivo,
  UpdateArchivo,
  GetAllArchivos,
  GetArchivoById,
  DeleteArchivo,
  UploadArchivo,
} from "@/lib/Controllers/ArchivoController";

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Archivo[]; itemCount: number }> {
  try {
    const response = await GetAllArchivos();
    let archivos: Archivo[] = response.data || [];

    // Asegurarse de que todos los elementos tengan id como string
    archivos = archivos.map((archivo) => ({
      ...archivo,
      id: String(archivo.id),
    }));

    // Apply filters
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        archivos = archivos.filter((archivo) => {
          const itemValue = archivo[field as keyof Archivo];

          switch (operator) {
            case "contains":
              return String(itemValue)
                .toLowerCase()
                .includes(String(value).toLowerCase());
            case "equals":
              return itemValue === value;
            case "startsWith":
              return String(itemValue)
                .toLowerCase()
                .startsWith(String(value).toLowerCase());
            case "endsWith":
              return String(itemValue)
                .toLowerCase()
                .endsWith(String(value).toLowerCase());
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortModel?.length) {
      archivos.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field as keyof Archivo] < b[field as keyof Archivo]) {
            return sort === "asc" ? -1 : 1;
          }
          if (a[field as keyof Archivo] > b[field as keyof Archivo]) {
            return sort === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedArchivos = archivos.slice(start, end);

    return {
      items: paginatedArchivos,
      itemCount: archivos.length,
    };
  } catch (error) {
    console.error("Error fetching archivos:", error);
    throw new Error("No se pudieron obtener los archivos");
  }
}

async function getOne(archivoId: string): Promise<Archivo> {
  try {
    const response = await GetArchivoById(archivoId);
    if (!response.data) {
      throw new Error("Archivo not found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching archivo:", error);
    throw new Error("No se pudo obtener el archivo");
  }
}

async function createOne(data: Omit<Archivo, "id">): Promise<Archivo> {
  try {
    const response = await CreateArchivo(data);
    return response.data;
  } catch (error) {
    console.error("Error creating archivo:", error);
    throw new Error("No se pudo crear el archivo");
  }
}

async function updateOne(
  archivoId: string,
  data: Partial<Archivo>
): Promise<Archivo> {
  try {
    const response = await UpdateArchivo(archivoId, data);
    return response.data;
  } catch (error) {
    console.error("Error updating archivo:", error);
    throw new Error("No se pudo actualizar el archivo");
  }
}

async function deleteOne(archivoId: string): Promise<void> {
  try {
    await DeleteArchivo(archivoId);
  } catch (error) {
    console.error("Error deleting archivo:", error);
    throw new Error("No se pudo eliminar el archivo");
  }
}

// Función especial para subir archivos
async function uploadFile(file: File): Promise<Archivo> {
  try {
    const response = await UploadArchivo(file);
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("No se pudo subir el archivo");
  }
}

function validate(archivo: Partial<Archivo>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!archivo.nombre) {
    issues = [
      ...issues,
      { message: "Nombre del archivo es requerido", path: ["nombre"] },
    ];
  }

  if (!archivo.tipo) {
    issues = [
      ...issues,
      { message: "Tipo de archivo es requerido", path: ["tipo"] },
    ];
  }

  if (!archivo.url) {
    issues = [
      ...issues,
      { message: "URL del archivo es requerida", path: ["url"] },
    ];
  }

  return { issues };
}

export const archivoDataService: DataService<Archivo> & {
  uploadFile: typeof uploadFile;
} = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
  uploadFile,
};
