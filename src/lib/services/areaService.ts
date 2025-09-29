import type { Area, AreaInsert } from '@/types/area';
import type { DataService, ValidationResult } from '@/types/generic';
import type { GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import {
    CreateArea,
    UpdateArea,
    GetAllAreas,
    GetAreaById,
    DeleteArea
} from '@/lib/Controllers/AreaController';

async function getMany({
    paginationModel,
    filterModel,
    sortModel,
}: {
    paginationModel: GridPaginationModel;
    sortModel: GridSortModel;
    filterModel: GridFilterModel;
}): Promise<{ items: Area[]; itemCount: number }> {
    try {
        // Obtener todos los datos del servidor
        const serverData = await GetAllAreas();
        let areas: Area[] = serverData;

        // Asegurarse de que todos los elementos tengan id como string
        areas = areas.map(area => ({
            ...area,
            id: String(area.id),
        }));

        let filteredItems = [...areas];

        // Apply filters
        if (filterModel?.items?.length) {
            filterModel.items.forEach(({ field, value, operator }) => {
                if (!field || value == null) {
                    return;
                }

                filteredItems = filteredItems.filter((area) => {
                    const itemValue = area[field as keyof Area];

                    switch (operator) {
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

        // Apply sorting
        if (sortModel?.length) {
            filteredItems.sort((a, b) => {
                for (const { field, sort } of sortModel) {
                    if (a[field as keyof Area] < b[field as keyof Area]) {
                        return sort === 'asc' ? -1 : 1;
                    }
                    if (a[field as keyof Area] > b[field as keyof Area]) {
                        return sort === 'asc' ? 1 : -1;
                    }
                }
                return 0;
            });
        }

        // Apply pagination
        const start = paginationModel.page * paginationModel.pageSize;
        const end = start + paginationModel.pageSize;
        const paginatedAreas = filteredItems.slice(start, end);

        return {
            items: paginatedAreas,
            itemCount: filteredItems.length,
        };
    } catch (error) {
        console.error('Error fetching areas:', error);
        throw new Error('Failed to fetch areas');
    }
}

async function getOne(areaId: string): Promise<Area> {
    try {
        const area = await GetAreaById(parseInt(areaId));
        return {
            ...area,
            id: String(area.id),
        };
    } catch (error) {
        console.error('Error fetching area:', error);
        throw new Error('Area not found');
    }
}

async function createOne(data: AreaInsert): Promise<Area> {
    try {
        const newArea = await CreateArea(data);
        return {
            ...newArea,
            id: String(newArea.id),
        };
    } catch (error) {
        console.error('Error creating area:', error);
        throw new Error('Failed to create area');
    }
}

async function updateOne(areaId: string, data: Partial<AreaInsert>): Promise<Area> {
    try {
        // Primero obtener el área actual para combinar los datos
        const currentArea = await GetAreaById(parseInt(areaId));
        const updatedData: Area = {
            ...currentArea,
            ...data,
        };
        
        const updatedArea = await UpdateArea(parseInt(areaId), updatedData);
        return {
            ...updatedArea,
            id: String(updatedArea.id),
        };
    } catch (error) {
        console.error('Error updating area:', error);
        throw new Error('Failed to update area');
    }
}

async function deleteOne(areaId: string): Promise<void> {
    try {
        await DeleteArea(areaId);
    } catch (error) {
        console.error('Error deleting area:', error);
        throw new Error('Failed to delete area');
    }
}

function validate(area: Partial<Area>): ValidationResult {
    let issues: ValidationResult['issues'] = [];

    if (!area.nombre || area.nombre.trim() === '') {
        issues = [...issues, { message: 'Nombre es requerido', path: ['nombre'] }];
    }

    if (area.nombre && area.nombre.length < 3) {
        issues = [...issues, { message: 'Nombre debe tener al menos 3 caracteres', path: ['nombre'] }];
    }

    return { issues };
}

export const areaDataService: DataService<Area> = {
    getMany,
    getOne,
    createOne,
    updateOne,
    deleteOne,
    validate,
};