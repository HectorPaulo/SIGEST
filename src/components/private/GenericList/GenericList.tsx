import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
    DataGrid,
    gridClasses,
    type GridColDef,
    type GridEventListener,
    type GridFilterModel,
    type GridPaginationModel,
    type GridSortModel,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useDialogs } from '@/hooks/useDialogs/useDialogs';
import useNotifications from '@/hooks/useNotifications/useNotifications';
import PageContainer from '@/components/private/PageContainer/PageContainer';
import type { BaseEntity, EntityConfig, ColumnConfig } from '@/types/generic';

const INITIAL_PAGE_SIZE = 10;

interface GenericListProps<T extends BaseEntity> {
    config: EntityConfig<T>;
}

export default function GenericList<T extends BaseEntity>({ config }: GenericListProps<T>) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const dialogs = useDialogs();
    const notifications = useNotifications();

    const [paginationModel, setPaginationModel] = React.useState<GridPaginationModel>({
        page: searchParams.get('page') ? Number(searchParams.get('page')) : 0,
        pageSize: searchParams.get('pageSize')
            ? Number(searchParams.get('pageSize'))
            : INITIAL_PAGE_SIZE,
    });
    const [filterModel, setFilterModel] = React.useState<GridFilterModel>(
        searchParams.get('filter')
            ? JSON.parse(searchParams.get('filter') ?? '')
            : { items: [] },
    );
    const [sortModel, setSortModel] = React.useState<GridSortModel>(
        searchParams.get('sort') ? JSON.parse(searchParams.get('sort') ?? '') : [],
    );

    const [rowsState, setRowsState] = React.useState<{
        rows: T[];
        rowCount: number;
    }>({
        rows: [],
        rowCount: 0,
    });

    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<Error | null>(null);

    const handlePaginationModelChange = React.useCallback(
        (model: GridPaginationModel) => {
            setPaginationModel(model);
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('page', String(model.page));
            newSearchParams.set('pageSize', String(model.pageSize));
            router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        [router, pathname, searchParams],
    );

    const handleFilterModelChange = React.useCallback(
        (model: GridFilterModel) => {
            setFilterModel(model);
            const newSearchParams = new URLSearchParams(searchParams);
            if (
                model.items.length > 0 ||
                (model.quickFilterValues && model.quickFilterValues.length > 0)
            ) {
                newSearchParams.set('filter', JSON.stringify(model));
            } else {
                newSearchParams.delete('filter');
            }
            router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        [router, pathname, searchParams],
    );

    const handleSortModelChange = React.useCallback(
        (model: GridSortModel) => {
            setSortModel(model);
            const newSearchParams = new URLSearchParams(searchParams);
            if (model.length > 0) {
                newSearchParams.set('sort', JSON.stringify(model));
            } else {
                newSearchParams.delete('sort');
            }
            router.push(`${pathname}?${newSearchParams.toString()}`);
        },
        [router, pathname, searchParams],
    );

    const loadData = React.useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            const listData = await config.dataService.getMany({
                paginationModel,
                sortModel,
                filterModel,
            });

            setRowsState({
                rows: listData.items,
                rowCount: listData.itemCount,
            });
        } catch (listDataError) {
            setError(listDataError as Error);
        }

        setIsLoading(false);
    }, [config.dataService, paginationModel, sortModel, filterModel]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    const handleRefresh = React.useCallback(() => {
        if (!isLoading) {
            loadData();
        }
    }, [isLoading, loadData]);

    const handleRowClick = React.useCallback<GridEventListener<'rowClick'>>(
        ({ row }) => {
            router.push(`${config.basePath}/${row.id}`);
        },
        [router, config.basePath],
    );

    const handleCreateClick = React.useCallback(() => {
        router.push(`${config.basePath}/new`);
    }, [router, config.basePath]);

    const handleRowEdit = React.useCallback(
        (item: T) => () => {
            router.push(`${config.basePath}/${item.id}/edit`);
        },
        [router, config.basePath],
    );

    const handleRowDelete = React.useCallback(
        (item: T) => async () => {
            const confirmed = await dialogs.confirm(
                `¿Desea eliminar este ${config.entityName.toLowerCase()}?`,
                {
                    title: `¿Eliminar ${config.entityName.toLowerCase()}?`,
                    severity: 'error',
                    okText: 'Eliminar',
                    cancelText: 'Cancelar',
                },
            );

            if (confirmed) {
                setIsLoading(true);
                try {
                    await config.dataService.deleteOne(item.id);

                    notifications.show(`${config.entityName} eliminado exitosamente.`, {
                        severity: 'success',
                        autoHideDuration: 3000,
                    });
                    loadData();
                } catch (deleteError) {
                    notifications.show(
                        `Error al eliminar ${config.entityName.toLowerCase()}. Razón: ${(deleteError as Error).message}`,
                        {
                            severity: 'error',
                            autoHideDuration: 3000,
                        },
                    );
                }
                setIsLoading(false);
            }
        },
        [dialogs, notifications, loadData, config],
    );

    const initialState = React.useMemo(
        () => ({
            pagination: { paginationModel: { pageSize: INITIAL_PAGE_SIZE } },
        }),
        [],
    );

    const columns = React.useMemo<GridColDef[]>(() => {
        const baseColumns = config.tableColumns.map((col: ColumnConfig) => ({
            field: col.field,
            headerName: col.headerName,
            type: col.type,
            width: col.width,
            flex: col.flex,
            valueOptions: col.valueOptions,
            valueGetter: col.valueGetter,
        }));

        const actionsColumn: GridColDef = {
            field: 'actions',
            type: 'actions',
            flex: 1,
            align: 'right',
            getActions: ({ row }) => [
                <GridActionsCellItem
                    key="edit-item"
                    icon={<EditIcon />}
                    label="Editar"
                    onClick={handleRowEdit(row)}
                />,
                <GridActionsCellItem
                    key="delete-item"
                    icon={<DeleteIcon />}
                    label="Eliminar"
                    onClick={handleRowDelete(row)}
                />,
            ],
        };

        return [...baseColumns, actionsColumn];
    }, [config.tableColumns, handleRowEdit, handleRowDelete]);

    return (
        <PageContainer
            title={config.entityNamePlural}
            breadcrumbs={[{ title: config.entityNamePlural }]}
            actions={
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title="Recargar datos" placement="right" enterDelay={1000}>
                        <div>
                            <IconButton size="small" aria-label="refresh" onClick={handleRefresh}>
                                <RefreshIcon />
                            </IconButton>
                        </div>
                    </Tooltip>
                    <Button
                        variant="contained"
                        onClick={handleCreateClick}
                        startIcon={<AddIcon />}
                    >
                        Crear
                    </Button>
                </Stack>
            }
        >
            <Box sx={{ flex: 1, width: '100%' }}>
                {error ? (
                    <Box sx={{ flexGrow: 1 }}>
                        <Alert severity="error">{error.message}</Alert>
                    </Box>
                ) : (
                    <DataGrid
                        rows={rowsState.rows}
                        rowCount={rowsState.rowCount}
                        columns={columns}
                        pagination
                        sortingMode="server"
                        filterMode="server"
                        paginationMode="server"
                        paginationModel={paginationModel}
                        onPaginationModelChange={handlePaginationModelChange}
                        sortModel={sortModel}
                        onSortModelChange={handleSortModelChange}
                        filterModel={filterModel}
                        onFilterModelChange={handleFilterModelChange}
                        disableRowSelectionOnClick
                        onRowClick={handleRowClick}
                        loading={isLoading}
                        initialState={initialState}
                        pageSizeOptions={[5, INITIAL_PAGE_SIZE, 25]}
                        sx={{
                            [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
                                outline: 'transparent',
                            },
                            [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
                            {
                                outline: 'none',
                            },
                            [`& .${gridClasses.row}:hover`]: {
                                cursor: 'pointer',
                            },
                        }}
                        slotProps={{
                            loadingOverlay: {
                                variant: 'circular-progress',
                                noRowsVariant: 'circular-progress',
                            },
                            baseIconButton: {
                                size: 'small',
                            },
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                    />
                )}
            </Box>
        </PageContainer>
    );
}