import type { Empleado, EmpleadoInsert } from "@/types/empleado";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";

const INITIAL_EMPLEADOS: Empleado[] = [
  {
    id: "1",
    nombre: "Juan",
    apellidoPaterno: "García",
    apellidoMaterno: "López",
    area: "Tecnología",
    clave: "EMP001",
    rolNombre: "Desarrollador",
    rolClave: 1,
  },
  {
    id: "2",
    nombre: "María",
    apellidoPaterno: "Rodríguez",
    apellidoMaterno: "Silva",
    area: "Recursos Humanos",
    clave: "EMP002",
    rolNombre: "Analista RH",
    rolClave: 2,
  },
];

function getEmpleadosStore(): Empleado[] {
  if (typeof window === "undefined") return INITIAL_EMPLEADOS;
  const stringifiedEmpleados = localStorage.getItem("empleados-store");
  return stringifiedEmpleados
    ? JSON.parse(stringifiedEmpleados)
    : INITIAL_EMPLEADOS;
}

function setEmpleadosStore(empleados: Empleado[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("empleados-store", JSON.stringify(empleados));
}

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Empleado[]; itemCount: number }> {
  const empleadosStore = getEmpleadosStore();

  let filteredItems = [...empleadosStore];

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
}

async function getOne(empleadoId: string): Promise<Empleado> {
  const empleadosStore = getEmpleadosStore();

  const empleadoToShow = empleadosStore.find(
    (empleado) => empleado.id === empleadoId
  );

  if (!empleadoToShow) {
    throw new Error("Empleado not found");
  }
  return empleadoToShow;
}

async function createOne(data: EmpleadoInsert): Promise<Empleado> {
  const empleadosStore = getEmpleadosStore();

  const newEmpleado: Empleado = {
    id: (
      Math.max(...empleadosStore.map((e) => parseInt(e.id)), 0) + 1
    ).toString(),
    ...data,
  };

  setEmpleadosStore([...empleadosStore, newEmpleado]);

  return newEmpleado;
}

async function updateOne(
  empleadoId: string,
  data: Partial<EmpleadoInsert>
): Promise<Empleado> {
  const empleadosStore = getEmpleadosStore();

  let updatedEmpleado: Empleado | null = null;

  setEmpleadosStore(
    empleadosStore.map((empleado) => {
      if (empleado.id === empleadoId) {
        updatedEmpleado = { ...empleado, ...data };
        return updatedEmpleado;
      }
      return empleado;
    })
  );

  if (!updatedEmpleado) {
    throw new Error("Empleado not found");
  }
  return updatedEmpleado;
}

async function deleteOne(empleadoId: string): Promise<void> {
  const empleadosStore = getEmpleadosStore();

  setEmpleadosStore(
    empleadosStore.filter((empleado) => empleado.id !== empleadoId)
  );
}

function validate(empleado: Partial<Empleado>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!empleado.nombre) {
    issues = [...issues, { message: "Nombre is required", path: ["nombre"] }];
  }

  if (!empleado.apellidoPaterno) {
    issues = [
      ...issues,
      { message: "Apellido paterno is required", path: ["apellidoPaterno"] },
    ];
  }

  if (!empleado.clave) {
    issues = [...issues, { message: "Clave is required", path: ["clave"] }];
  }

  if (!empleado.area) {
    issues = [...issues, { message: "Area is required", path: ["area"] }];
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
