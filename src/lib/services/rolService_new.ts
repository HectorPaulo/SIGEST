import type { Rol, RolInsert } from '@/types/rol';
import type { DataService, ValidationResult } from '@/types/generic';
import type { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import {
    CreateRol,
    UpdateRol,
    GetAllRoles,
    GetRolesById,
    DeleteRol
} from '@/lib/Controllers/RolController';

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

        // Asegurarse de que todos los elementos tengan id como string
        roles = roles.map(rol => ({
            ...rol,
            id: String(rol.id),
        }));

        let filteredItems = [...roles];

        // Apply filters
        if (filterModel?.items?.length) {
            filterModel.items.forEach(({ field, value, operator }) => {
                if (!field || value == null) {
                    return;
                }

                filteredItems = filteredItems.filter((rol) => {
                    const itemValue = rol[field as keyof Rol];

                    switch (operator) {
                        case 'contains':
                            return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
                        case 'equals':
                            return itemValue === value;
                        case 'startsWith':
                            return String(itemValue).toLowerCase().startsWith(String(value).toLowerCase());
                        case 'endsWith':
                            return String(itemValue).toLowerCase().endsWith(String(value).toLowerCase());
                        case '>':
                            return itemValue > value;
                        case '<':
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
                        return sort === 'asc' ? -1 : 1;
                    }
                    if (a[field as keyof Rol] > b[field as keyof Rol]) {
                        return sort === 'asc' ? 1 : -1;
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
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw new Error('Failed to fetch roles');
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
        console.error('Error creating rol:', error);
        throw new Error('Failed to create rol');
    }
}

async function updateOne(rolId: string, data: Partial<RolInsert>): Promise<Rol> {
    try {
        // Primero obtener el rol actual para combinar los datos
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
        console.error('Error updating rol:', error);
        throw new Error('Failed to update rol');
    }
}

async function deleteOne(rolId: string): Promise<void> {
    try {
        await DeleteRol(rolId);
    } catch (error) {
        console.error('Error deleting rol:', error);
        throw new Error('Failed to delete rol');
    }
}

function validate(rol: Partial<Rol>): ValidationResult {
    let issues: ValidationResult['issues'] = [];

    if (!rol.nombre || rol.nombre.trim() === '') {
        issues = [...issues, { message: 'Nombre es requerido', path: ['nombre'] }];
    }

    if (!rol.clave && rol.clave !== 0) {
        issues = [...issues, { message: 'Clave es requerida', path: ['clave'] }];
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