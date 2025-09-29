import type { Empleado, EmpleadoInsert } from "@/types/empleado";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  CreateEmpleado,
  UpdateEmpleado,
  GetAllEmpleados,
  GetEmpleadoById,
  DeleteEmpleado,
} from "@/lib/Controllers/EmpleadosController";

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Empleado[]; itemCount: number }> {
  try {
    // Obtener todos los datos del servidor
    const serverData = await GetAllEmpleados();
    let empleados: Empleado[] = serverData;

    // Asegurarse de que todos los elementos tengan id como string
    empleados = empleados.map((empleado) => ({
      ...empleado,
      id: String(empleado.id),
    }));

    let filteredItems = [...empleados];

    // Apply filters
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        filteredItems = filteredItems.filter((empleado) => {
          const itemValue = empleado[field as keyof Empleado];

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
      filteredItems.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field as keyof Empleado] < b[field as keyof Empleado]) {
            return sort === "asc" ? -1 : 1;
          }
          if (a[field as keyof Empleado] > b[field as keyof Empleado]) {
            return sort === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedEmpleados = filteredItems.slice(start, end);

    return {
      items: paginatedEmpleados,
      itemCount: filteredItems.length,
    };
  } catch (error) {
    console.error("Error fetching empleados:", error);
    throw new Error("Failed to fetch empleados");
  }
}

async function getOne(empleadoId: string): Promise<Empleado> {
  try {
    const empleado = await GetEmpleadoById(parseInt(empleadoId));
    return {
      ...empleado,
      id: String(empleado.id),
    };
  } catch (error) {
    console.error("Error fetching empleado:", error);
    throw new Error("Empleado not found");
  }
}

async function createOne(data: EmpleadoInsert): Promise<Empleado> {
  try {
    const newEmpleado = await CreateEmpleado(data);
    return {
      ...newEmpleado,
      id: String(newEmpleado.id),
    };
  } catch (error) {
    console.error("Error creating empleado:", error);
    throw new Error("Failed to create empleado");
  }
}

async function updateOne(
  empleadoId: string,
  data: Partial<EmpleadoInsert>
): Promise<Empleado> {
  try {
    // Primero obtener el empleado actual para combinar los datos
    const currentEmpleado = await GetEmpleadoById(parseInt(empleadoId));
    const updatedData: Empleado = {
      ...currentEmpleado,
      ...data,
    };

    const updatedEmpleado = await UpdateEmpleado(
      parseInt(empleadoId),
      updatedData
    );
    return {
      ...updatedEmpleado,
      id: String(updatedEmpleado.id),
    };
  } catch (error) {
    console.error("Error updating empleado:", error);
    throw new Error("Failed to update empleado");
  }
}

async function deleteOne(empleadoId: string): Promise<void> {
  try {
    await DeleteEmpleado(empleadoId);
  } catch (error) {
    console.error("Error deleting empleado:", error);
    throw new Error("Failed to delete empleado");
  }
}

function validate(empleado: Partial<Empleado>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!empleado.nombre || empleado.nombre.trim() === "") {
    issues = [...issues, { message: "Nombre es requerido", path: ["nombre"] }];
  }

  if (!empleado.apellidoPaterno || empleado.apellidoPaterno.trim() === "") {
    issues = [
      ...issues,
      { message: "Apellido paterno es requerido", path: ["apellidoPaterno"] },
    ];
  }

  if (!empleado.clave || empleado.clave.trim() === "") {
    issues = [...issues, { message: "Clave es requerida", path: ["clave"] }];
  }

  if (!empleado.area || empleado.area.trim() === "") {
    issues = [...issues, { message: "Área es requerida", path: ["area"] }];
  }

  return { issues };
}

export const empleadoDataService: DataService<Empleado> = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
};
