import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";

// Interfaz base para todas las entidades
export interface BaseEntity {
  id: string;
}

// Interfaz genérica para inserción (sin id)
export type EntityInsert<T extends BaseEntity> = Omit<T, "id">;

// Interfaz para operaciones de datos genéricas
export interface DataService<T extends BaseEntity> {
  getMany: (params: {
    paginationModel: GridPaginationModel;
    sortModel: GridSortModel;
    filterModel: GridFilterModel;
  }) => Promise<{ items: T[]; itemCount: number }>;
  getOne: (id: string) => Promise<T>;
  createOne: (data: EntityInsert<T>) => Promise<T>;
  updateOne: (id: string, data: Partial<EntityInsert<T>>) => Promise<T>;
  deleteOne: (id: string) => Promise<void>;
  validate: (data: Partial<T>) => ValidationResult;
}

// Resultado de validación
export interface ValidationResult {
  issues: { message: string; path: string[] }[];
}

// Configuración de campos para formularios
export interface FormFieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "checkbox" | "textarea";
  required?: boolean;
  options?: { value: string | number; label: string }[];
  optionsLoader?: () => Promise<{ value: string | number; label: string }[]>;
  gridSize?: { xs?: number; sm?: number; md?: number; lg?: number };
}

// Configuración de columnas para la tabla
export interface ColumnConfig {
  field: string;
  headerName: string;
  type?: "string" | "number" | "date" | "boolean" | "singleSelect";
  width?: number;
  valueOptions?: string[];
  valueGetter?: (value: unknown) => unknown;
  flex?: number;
}

// Configuración para una entidad CRUD
export interface EntityConfig<T extends BaseEntity> {
  entityName: string;
  entityNamePlural: string;
  basePath: string;
  dataService: DataService<T>;
  formFields: FormFieldConfig[];
  showFields?: FormFieldConfig[]; // Campos específicos para la vista de detalles
  editFields?: FormFieldConfig[]; // Campos específicos para editar
  tableColumns: ColumnConfig[];
  defaultValues?: Partial<EntityInsert<T>>;
}
