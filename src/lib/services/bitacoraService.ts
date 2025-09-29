import type { Bitacora } from "@/types/Bitacora";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  CreateBitacora,
  UpdateBitacora,
  GetAllBitacora,
  GetBitacoraById,
  DeleteBitacora,
} from "@/lib/Controllers/BitacoraController";

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Bitacora[]; itemCount: number }> {
  try {
    const response = await GetAllBitacora();
    let bitacora: Bitacora[] = response.data || [];

    // Asegurarse de que todos los elementos tengan id como string
    bitacora = bitacora.map((entry) => ({
      ...entry,
      id: String(entry.id),
    }));

    // Apply filters
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        bitacora = bitacora.filter((entry) => {
          const itemValue = entry[field as keyof Bitacora];

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
      bitacora.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field as keyof Bitacora] < b[field as keyof Bitacora]) {
            return sort === "asc" ? -1 : 1;
          }
          if (a[field as keyof Bitacora] > b[field as keyof Bitacora]) {
            return sort === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedBitacora = bitacora.slice(start, end);

    return {
      items: paginatedBitacora,
      itemCount: bitacora.length,
    };
  } catch (error) {
    console.error("Error fetching bitácora:", error);
    throw new Error("No se pudieron obtener las entradas de bitácora");
  }
}

async function getOne(bitacoraId: string): Promise<Bitacora> {
  try {
    const response = await GetBitacoraById(bitacoraId);
    if (!response.data) {
      throw new Error("Bitácora entry not found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching bitácora entry:", error);
    throw new Error("No se pudo obtener la entrada de bitácora");
  }
}

async function createOne(data: Omit<Bitacora, "id">): Promise<Bitacora> {
  try {
    const response = await CreateBitacora(data as Bitacora);
    return response.data;
  } catch (error) {
    console.error("Error creating bitácora entry:", error);
    throw new Error("No se pudo crear la entrada de bitácora");
  }
}

async function updateOne(
  bitacoraId: string,
  data: Partial<Bitacora>
): Promise<Bitacora> {
  try {
    const response = await UpdateBitacora(bitacoraId, data);
    return response.data;
  } catch (error) {
    console.error("Error updating bitácora entry:", error);
    throw new Error("No se pudo actualizar la entrada de bitácora");
  }
}

async function deleteOne(bitacoraId: string): Promise<void> {
  try {
    await DeleteBitacora(bitacoraId);
  } catch (error) {
    console.error("Error deleting bitácora entry:", error);
    throw new Error("No se pudo eliminar la entrada de bitácora");
  }
}

function validate(bitacora: Partial<Bitacora>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!bitacora.fecha) {
    issues = [...issues, { message: "Fecha es requerida", path: ["fecha"] }];
  }

  if (!bitacora.hora) {
    issues = [...issues, { message: "Hora es requerida", path: ["hora"] }];
  }

  if (!bitacora.motivo) {
    issues = [...issues, { message: "Motivo es requerido", path: ["motivo"] }];
  }

  if (!bitacora.empleado) {
    issues = [
      ...issues,
      { message: "Empleado es requerido", path: ["empleado"] },
    ];
  }

  if (!bitacora.entrada) {
    issues = [
      ...issues,
      { message: "Entrada es requerida", path: ["entrada"] },
    ];
  }

  return { issues };
}

export const bitacoraDataService: DataService<Bitacora> = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
};
