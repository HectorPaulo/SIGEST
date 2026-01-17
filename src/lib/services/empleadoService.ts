import type { Empleado, EmpleadoInsert } from "@/types/empleado";
import type {
  DataService,
  ValidationResult,
  EntityInsert,
} from "@/types/generic";
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
    console.log("=== DEBUG: Obteniendo empleado por ID ===");
    console.log("ID solicitado:", empleadoId);

    const empleado = await GetEmpleadoById(parseInt(empleadoId));

    console.log("Respuesta completa del servidor:");
    console.log(JSON.stringify(empleado, null, 2));

    console.log("Verificando propiedades específicas:");
    console.log("- area:", empleado.area);
    console.log("- rol:", empleado.rol);
    console.log("- Tipo de area:", typeof empleado.area);
    console.log("- Tipo de rol:", typeof empleado.rol);

    // Crear el objeto con los IDs extraídos para facilitar la edición
    const empleadoWithIds = {
      ...empleado,
      id: String(empleado.id),
      // Agregar los IDs para que los formularios de edición puedan usarlos
      areaId: empleado.area?.id || null,
      rolId: empleado.rol?.id || null,
    };

    console.log("Empleado procesado con IDs:", empleadoWithIds);

    return empleadoWithIds;
  } catch (error) {
    console.error("Error fetching empleado:", error);
    throw new Error("Empleado not found");
  }
}

async function createOne(data: EmpleadoInsert): Promise<Empleado> {
  try {
    console.log("=== DEBUG: Datos que se van a enviar al crear empleado ===");
    console.log("Data received in createOne:", JSON.stringify(data, null, 2));

    // Validar que todos los campos requeridos estén presentes
    const requiredFields = [
      "nombre",
      "apellidoPaterno",
      "clave",
      "areaId",
      "rolId",
    ];
    const missingFields = requiredFields.filter(
      (field) => !data[field as keyof EmpleadoInsert]
    );

    if (missingFields.length > 0) {
      console.error("Campos faltantes:", missingFields);
      throw new Error(
        `Campos requeridos faltantes: ${missingFields.join(", ")}`
      );
    }

    console.log(
      "Todos los campos requeridos están presentes, enviando al controlador..."
    );
    const newEmpleado = await CreateEmpleado(data);
    console.log("Respuesta del servidor:", newEmpleado);

    return {
      ...newEmpleado,
      id: String(newEmpleado.id),
    };
  } catch (error) {
    console.error("Error detallado al crear el empleado:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error; // Re-lanzar el error original para más detalles
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

function validate(
  empleado: Partial<Empleado> | Partial<EmpleadoInsert>
): ValidationResult {
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

  // Check for areaId if it exists (EmpleadoInsert format)
  if ("areaId" in empleado && !empleado.areaId) {
    issues = [...issues, { message: "Área es requerida", path: ["areaId"] }];
  }

  // Check for rolId if it exists (EmpleadoInsert format)
  if ("rolId" in empleado && !empleado.rolId) {
    issues = [...issues, { message: "Rol es requerido", path: ["rolId"] }];
  }

  return { issues };
}

// Wrapper function to match the generic interface
async function createOneWrapper(
  data: EntityInsert<Empleado> & { areaId: number; rolId: number }
): Promise<Empleado> {
  // Convert the data to EmpleadoInsert format
  const empleadoData: EmpleadoInsert = {
    nombre: data.nombre,
    apellidoPaterno: data.apellidoPaterno,
    apellidoMaterno: data.apellidoMaterno,
    clave: data.clave,
    areaId: data.areaId,
    rolId: data.rolId,
  };
  return createOne(empleadoData);
}

export const empleadoDataService: DataService<Empleado> = {
  getMany,
  getOne,
  createOne: createOneWrapper,
  updateOne,
  deleteOne,
  validate,
};
