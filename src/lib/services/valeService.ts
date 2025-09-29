import type { Vale } from "@/types/vale";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  CreateVale,
  UpdateVale,
  GetAllVales,
  GetValeById,
  DeleteVale,
} from "@/lib/Controllers/ValesController";

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Vale[]; itemCount: number }> {
  try {
    const response = await GetAllVales();
    let vales: Vale[] = response.data || [];

    // Asegurarse de que todos los elementos tengan id como string
    vales = vales.map((vale) => ({
      ...vale,
      id: String(vale.id),
    }));

    // Apply filters
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        vales = vales.filter((vale) => {
          const itemValue = vale[field as keyof Vale];

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
      vales.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field as keyof Vale] < b[field as keyof Vale]) {
            return sort === "asc" ? -1 : 1;
          }
          if (a[field as keyof Vale] > b[field as keyof Vale]) {
            return sort === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedVales = vales.slice(start, end);

    return {
      items: paginatedVales,
      itemCount: vales.length,
    };
  } catch (error) {
    console.error("Error fetching vales:", error);
    throw new Error("No se pudieron obtener los vales");
  }
}

async function getOne(valeId: string): Promise<Vale> {
  try {
    const response = await GetValeById(parseInt(valeId));
    if (!response.data) {
      throw new Error("Vale not found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching vale:", error);
    throw new Error("No se pudo obtener el vale");
  }
}

async function createOne(data: Omit<Vale, "id">): Promise<Vale> {
  try {
    const response = await CreateVale(data as Vale);
    return response.data;
  } catch (error) {
    console.error("Error creating vale:", error);
    throw new Error("No se pudo crear el vale");
  }
}

async function updateOne(valeId: string, data: Partial<Vale>): Promise<Vale> {
  try {
    const response = await UpdateVale(parseInt(valeId), data as Vale);
    return response.data;
  } catch (error) {
    console.error("Error updating vale:", error);
    throw new Error("No se pudo actualizar el vale");
  }
}

async function deleteOne(valeId: string): Promise<void> {
  try {
    await DeleteVale(valeId);
  } catch (error) {
    console.error("Error deleting vale:", error);
    throw new Error("No se pudo eliminar el vale");
  }
}

function validate(vale: Partial<Vale>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!vale.nombre) {
    issues = [...issues, { message: "Nombre es requerido", path: ["nombre"] }];
  }

  if (!vale.areaAsignada) {
    issues = [
      ...issues,
      { message: "Área asignada es requerida", path: ["areaAsignada"] },
    ];
  }

  if (!vale.fecha) {
    issues = [...issues, { message: "Fecha es requerida", path: ["fecha"] }];
  }

  return { issues };
}

export const valeDataService: DataService<Vale> = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
};
