import type { Inventario, InventarioInsert } from "@/types/inventario";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  CreateInventario,
  UpdateInventario,
  GetAllInventario,
  GetInventarioById,
  DeleteInventario,
} from "@/lib/Controllers/InventarioController";

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Inventario[]; itemCount: number }> {
  try {
    const response = await GetAllInventario();
    let inventarios: Inventario[] = response.data || [];

    // Asegurarse de que todos los elementos tengan id como string
    inventarios = inventarios.map((inventario) => ({
      ...inventario,
      id: String(inventario.id),
    }));

    // Apply filters
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        inventarios = inventarios.filter((inventario) => {
          const itemValue = inventario[field as keyof Inventario];

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
            case ">":
              return itemValue > value;
            case "<":
              return itemValue < value;
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortModel?.length) {
      inventarios.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field as keyof Inventario] < b[field as keyof Inventario]) {
            return sort === "asc" ? -1 : 1;
          }
          if (a[field as keyof Inventario] > b[field as keyof Inventario]) {
            return sort === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedInventarios = inventarios.slice(start, end);

    return {
      items: paginatedInventarios,
      itemCount: inventarios.length,
    };
  } catch (error) {
    console.error("Error fetching inventarios:", error);
    throw new Error("No se pudieron obtener los inventarios");
  }
}

async function getOne(inventarioId: string): Promise<Inventario> {
  try {
    const response = await GetInventarioById(parseInt(inventarioId));
    if (!response.data) {
      throw new Error("Inventario not found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching inventario:", error);
    throw new Error("No se pudo obtener el inventario");
  }
}

async function createOne(data: InventarioInsert): Promise<Inventario> {
  try {
    const response = await CreateInventario(data);
    return response.data;
  } catch (error) {
    console.error("Error creating inventario:", error);
    throw new Error("No se pudo crear el inventario");
  }
}

async function updateOne(
  inventarioId: string,
  data: Partial<InventarioInsert>
): Promise<Inventario> {
  try {
    const inventarioData = {
      id: inventarioId,
      fechaBaja: "",
      ...data,
    } as Inventario;
    const response = await UpdateInventario(
      parseInt(inventarioId),
      inventarioData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating inventario:", error);
    throw new Error("No se pudo actualizar el inventario");
  }
}

async function deleteOne(inventarioId: string): Promise<void> {
  try {
    await DeleteInventario(inventarioId);
  } catch (error) {
    console.error("Error deleting inventario:", error);
    throw new Error("No se pudo eliminar el inventario");
  }
}

function validate(inventario: Partial<Inventario>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!inventario.nombre) {
    issues = [...issues, { message: "Nombre is required", path: ["nombre"] }];
  }

  if (!inventario.numeroSerie) {
    issues = [
      ...issues,
      { message: "Número de serie is required", path: ["numeroSerie"] },
    ];
  }

  if (!inventario.marca) {
    issues = [...issues, { message: "Marca is required", path: ["marca"] }];
  }

  if (!inventario.modelo) {
    issues = [...issues, { message: "Modelo is required", path: ["modelo"] }];
  }

  if (!inventario.fechaAlta) {
    issues = [
      ...issues,
      { message: "Fecha de alta is required", path: ["fechaAlta"] },
    ];
  }

  return { issues };
}

export const inventarioDataService: DataService<Inventario> = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
};
