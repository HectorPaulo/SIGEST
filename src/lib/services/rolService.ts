import { Rol, RolInsert } from "@/types/rol";
import type { DataService, ValidationResult } from '@/types/generic';
import type { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { CreateRol, DeleteRol, GetAllRoles, GetRolesById, UpdateRol } from "../Controllers/RolController";

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: Rol[]; itemCount: number }> {
  try {
    // Obtener todos los datos del servidor
    const serverData = await GetAllRoles();
    let roles: Rol[] = serverData;

    roles = roles.map(rol => ({
      ...rol,
      id: String(rol.id),
    }));

    let filteredItems = [...roles];

    // Aplicar filtros
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        filteredItems = filteredItems.filter((rol) => {
          const itemValue = rol[field as keyof Rol];

          switch(operator) {
            case 'contains':
              return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
            case 'equals':
              return itemValue === value;
            case 'startsWith':
              return String(itemValue).toLowerCase().startsWith(String(value).toLowerCase());
            case 'endsWith':
              return String(itemValue).toLowerCase().endsWith(String(value).toLowerCase());
            default:
              return true;
          }
        });
      });
    }

    // * Aplicar sorting
    if (sortModel?.length) {
      filteredItems.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field as keyof Rol] < b[field as keyof Rol]) {
            return sort === 'asc' ? -1 : 1;
          }
          if (a[field as keyof Rol] > b[field as keyof Rol]) {
            return sort === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // * Aplicar paginacion
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedAreas = filteredItems.slice(start, end);

    return {
      items: paginatedAreas,
      itemCount: filteredItems.length,
    };
  } catch (error) {
    console.error('Error encontrando roles: ', error)
    throw new Error('Error al encontrar roles');
  }
}

async function getOne(rolId: string): Promise<Rol> {
    try {
        const rol = await GetRolesById(parseInt(rolId));
        return {
            ...rol,
            id: String(rol.id),
        };
    } catch (error) {
        console.error('Error fetching rol:', error);
        throw new Error('Rol not found');
    }
}

async function createOne(data: RolInsert): Promise<Rol> {
  try {
    const newRol = await CreateRol(data);
    return {
      ...newRol,
      id: String(newRol.id),
    };
  } catch (error) {
    console.error('Error creating rol: ', error);
    throw new Error('Error al crear rol');
  }
}

async function updateOne(rolId: string, data: Partial<RolInsert>): Promise<Rol> {
  try {
    const currentRol = await GetRolesById(parseInt(rolId));
    const updatedData: Rol = {
      ...currentRol,
      ...data,
    };

    const updatedRol = await UpdateRol(parseInt(rolId), updatedData);
    return {
      ...updatedRol,
      id: String(updatedRol.id),
    };
  } catch (error) {
      console.error('Error actualizando rol: ', error);
      throw new Error('Error al actualizar rol');
    }
  }

  async function deleteOne(rolId: string): Promise<void> {
    try {
      await DeleteRol(rolId);
    } catch (error) {
      console.error('Error eliminando rol: ', error);
      throw new Error('Error al eliminar rol');
    }
  }

  function validate(rol: Partial<RolInsert>): ValidationResult {
    let issues: ValidationResult['issues'] = [];

    if(!rol.nombre || rol.nombre.trim() === '') {
      issues = [...issues, { message: 'El nombre es requerido', path: ['nombre'] }];
    }

    if (rol.nombre && rol.nombre.length < 3) {
      issues = [...issues, { message: 'El nombre debe tener al menos 3 caracteres', path: ['nombre'] }];
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