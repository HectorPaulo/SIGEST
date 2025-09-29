import type { Funcion, FuncionInsert } from "@/types/funcion";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";

const INITIAL_FUNCIONES: Funcion[] = [
  {
    id: "1",
    clave: 1,
    nombre: "Administrador de Sistema",
    descripcion: "Administración completa del sistema",
  },
  {
    id: "2",
    clave: 2,
    nombre: "Gestión de Personal",
    descripcion: "Gestión de empleados y recursos humanos",
  },
  {
    id: "3",
    clave: 3,
    nombre: "Control Financiero",
    descripcion: "Control de gastos y presupuestos",
  },
];

function getFuncionesStore(): Funcion[] {
  if (typeof window === "undefined") return INITIAL_FUNCIONES;
  const stringifiedFunciones = localStorage.getItem("funciones-store");
  return stringifiedFunciones
    ? JSON.parse(stringifiedFunciones)
    : INITIAL_FUNCIONES;
}

function setFuncionesStore(funciones: Funcion[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("funciones-store", JSON.stringify(funciones));
}

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Funcion[]; itemCount: number }> {
  const funcionesStore = getFuncionesStore();

  let filteredItems = [...funcionesStore];

  // Apply filters
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredItems = filteredItems.filter((funcion) => {
        const itemValue = funcion[field as keyof Funcion];

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
        if (a[field as keyof Funcion] < b[field as keyof Funcion]) {
          return sort === "asc" ? -1 : 1;
        }
        if (a[field as keyof Funcion] > b[field as keyof Funcion]) {
          return sort === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedFunciones = filteredItems.slice(start, end);

  return {
    items: paginatedFunciones,
    itemCount: filteredItems.length,
  };
}

async function getOne(funcionId: string): Promise<Funcion> {
  const funcionesStore = getFuncionesStore();

  const funcionToShow = funcionesStore.find(
    (funcion) => funcion.id === funcionId
  );

  if (!funcionToShow) {
    throw new Error("Funcion not found");
  }
  return funcionToShow;
}

async function createOne(data: FuncionInsert): Promise<Funcion> {
  const funcionesStore = getFuncionesStore();

  const newFuncion: Funcion = {
    id: (
      Math.max(...funcionesStore.map((f) => parseInt(f.id)), 0) + 1
    ).toString(),
    descripcion: "",
    ...data,
  };

  setFuncionesStore([...funcionesStore, newFuncion]);

  return newFuncion;
}

async function updateOne(
  funcionId: string,
  data: Partial<FuncionInsert>
): Promise<Funcion> {
  const funcionesStore = getFuncionesStore();

  let updatedFuncion: Funcion | null = null;

  setFuncionesStore(
    funcionesStore.map((funcion) => {
      if (funcion.id === funcionId) {
        updatedFuncion = { ...funcion, ...data };
        return updatedFuncion;
      }
      return funcion;
    })
  );

  if (!updatedFuncion) {
    throw new Error("Funcion not found");
  }
  return updatedFuncion;
}

async function deleteOne(funcionId: string): Promise<void> {
  const funcionesStore = getFuncionesStore();

  setFuncionesStore(
    funcionesStore.filter((funcion) => funcion.id !== funcionId)
  );
}

function validate(funcion: Partial<Funcion>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!funcion.nombre) {
    issues = [...issues, { message: "Nombre is required", path: ["nombre"] }];
  }

  if (!funcion.clave && funcion.clave !== 0) {
    issues = [...issues, { message: "Clave is required", path: ["clave"] }];
  }

  return { issues };
}

export const funcionDataService: DataService<Funcion> = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
};
