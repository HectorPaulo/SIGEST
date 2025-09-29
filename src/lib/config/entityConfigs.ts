import type { Area } from "@/types/area";
import type { Empleado } from "@/types/empleado";
import type { Rol } from "@/types/rol";
import type { Funcion } from "@/types/funcion";
import type { EntityConfig } from "@/types/generic";
import { areaDataService } from "@/lib/services/areaService";
import { empleadoDataService } from "@/lib/services/empleadoService";
import { rolDataService } from "@/lib/services/rolService";
import { funcionDataService } from "@/lib/services/funcionService";

export const areaConfig: EntityConfig<Area> = {
  entityName: "Área",
  entityNamePlural: "Áreas",
  basePath: "/private/areas",
  dataService: areaDataService,
  formFields: [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      gridSize: { xs: 12 },
    },
  ],
  tableColumns: [
    { field: "id", headerName: "ID", width: 80 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 2 },
  ],
  defaultValues: {},
};

export const empleadoConfig: EntityConfig<Empleado> = {
  entityName: "Empleado",
  entityNamePlural: "Empleados",
  basePath: "/private/empleados",
  dataService: empleadoDataService,
  formFields: [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 4 },
    },
    {
      name: "apellidoPaterno",
      label: "Apellido Paterno",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 4 },
    },
    {
      name: "apellidoMaterno",
      label: "Apellido Materno",
      type: "text",
      gridSize: { xs: 12, sm: 4 },
    },
    {
      name: "clave",
      label: "Clave",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "area",
      label: "Área",
      type: "select",
      required: true,
      options: [
        { value: "Tecnología", label: "Tecnología" },
        { value: "Recursos Humanos", label: "Recursos Humanos" },
        { value: "Finanzas", label: "Finanzas" },
      ],
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "rolNombre",
      label: "Rol",
      type: "select",
      required: true,
      options: [
        { value: "Desarrollador", label: "Desarrollador" },
        { value: "Analista RH", label: "Analista RH" },
        { value: "Contador", label: "Contador" },
      ],
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "rolClave",
      label: "Clave de Rol",
      type: "number",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
  ],
  tableColumns: [
    { field: "id", headerName: "ID", width: 80 },
    { field: "nombre", headerName: "Nombre", width: 120 },
    { field: "apellidoPaterno", headerName: "Apellido Paterno", width: 140 },
    { field: "apellidoMaterno", headerName: "Apellido Materno", width: 140 },
    { field: "clave", headerName: "Clave", width: 100 },
    { field: "area", headerName: "Área", width: 140 },
    { field: "rolNombre", headerName: "Rol", width: 140 },
    { field: "rolClave", headerName: "Clave Rol", type: "number", width: 100 },
  ],
  defaultValues: {},
};

export const rolConfig: EntityConfig<Rol> = {
  entityName: "Rol",
  entityNamePlural: "Roles",
  basePath: "/private/roles",
  dataService: rolDataService,
  formFields: [
    {
      name: "clave",
      label: "Clave",
      type: "number",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      gridSize: { xs: 12 },
    },
  ],
  tableColumns: [
    { field: "id", headerName: "ID", width: 80 },
    { field: "clave", headerName: "Clave", type: "number", width: 100 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 2 },
  ],
  defaultValues: {},
};

export const funcionConfig: EntityConfig<Funcion> = {
  entityName: "Función",
  entityNamePlural: "Funciones",
  basePath: "/private/funciones",
  dataService: funcionDataService,
  formFields: [
    {
      name: "clave",
      label: "Clave",
      type: "number",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      gridSize: { xs: 12 },
    },
  ],
  tableColumns: [
    { field: "id", headerName: "ID", width: 80 },
    { field: "clave", headerName: "Clave", type: "number", width: 100 },
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 2 },
  ],
  defaultValues: {},
};
