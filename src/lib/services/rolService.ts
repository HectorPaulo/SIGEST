import type { Rol, RolInsert } from "@/types/rol";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";

const INITIAL_ROLES: Rol[] = [
  {
    id: "1",
    clave: 1,
    nombre: "Desarrollador",
    descripcion: "Desarrollo de software",
  },
  {
    id: "2",
    clave: 2,
    nombre: "Analista RH",
    descripcion: "Análisis de recursos humanos",
  },
  {
    id: "3",
    clave: 3,
    nombre: "Contador",
    descripcion: "Gestión contable y financiera",
  },
];

function getRolesStore(): Rol[] {
  if (typeof window === "undefined") return INITIAL_ROLES;
  const stringifiedRoles = localStorage.getItem("roles-store");
  return stringifiedRoles ? JSON.parse(stringifiedRoles) : INITIAL_ROLES;
}

function setRolesStore(roles: Rol[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("roles-store", JSON.stringify(roles));
}

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Rol[]; itemCount: number }> {
  const rolesStore = getRolesStore();

  let filteredItems = [...rolesStore];

  // Apply filters
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredItems = filteredItems.filter((rol) => {
        const itemValue = rol[field as keyof Rol];

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
        if (a[field as keyof Rol] < b[field as keyof Rol]) {
          return sort === "asc" ? -1 : 1;
        }
        if (a[field as keyof Rol] > b[field as keyof Rol]) {
          return sort === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedRoles = filteredItems.slice(start, end);

  return {
    items: paginatedRoles,
    itemCount: filteredItems.length,
  };
}

async function getOne(rolId: string): Promise<Rol> {
  const rolesStore = getRolesStore();

  const rolToShow = rolesStore.find((rol) => rol.id === rolId);

  if (!rolToShow) {
    throw new Error("Rol not found");
  }
  return rolToShow;
}

async function createOne(data: RolInsert): Promise<Rol> {
  const rolesStore = getRolesStore();

  const newRol: Rol = {
    id: (Math.max(...rolesStore.map((r) => parseInt(r.id)), 0) + 1).toString(),
    ...data,
  };

  setRolesStore([...rolesStore, newRol]);

  return newRol;
}

async function updateOne(
  rolId: string,
  data: Partial<RolInsert>
): Promise<Rol> {
  const rolesStore = getRolesStore();

  let updatedRol: Rol | null = null;

  setRolesStore(
    rolesStore.map((rol) => {
      if (rol.id === rolId) {
        updatedRol = { ...rol, ...data };
        return updatedRol;
      }
      return rol;
    })
  );

  if (!updatedRol) {
    throw new Error("Rol not found");
  }
  return updatedRol;
}

async function deleteOne(rolId: string): Promise<void> {
  const rolesStore = getRolesStore();

  setRolesStore(rolesStore.filter((rol) => rol.id !== rolId));
}

function validate(rol: Partial<Rol>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!rol.nombre) {
    issues = [...issues, { message: "Nombre is required", path: ["nombre"] }];
  }

  if (!rol.clave && rol.clave !== 0) {
    issues = [...issues, { message: "Clave is required", path: ["clave"] }];
  }

  return { issues };
}

export const rolDataService: DataService<Rol> = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
};
