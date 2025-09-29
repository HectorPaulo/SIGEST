import type { Area } from "@/types/area";
import type { Empleado } from "@/types/empleado";
import type { Rol } from "@/types/rol";
import type { Funcion } from "@/types/funcion";
import type { Inventario } from "@/types/inventario";
import type { User } from "@/types/user";
import type { Vale } from "@/types/vale";
// import type { Bitacora } from "@/types/Bitacora";
// import type { Archivo } from "@/types/Archivo";
import type { EntityConfig } from "@/types/generic";
import { areaDataService } from "@/lib/services/areaService";
import { empleadoDataService } from "@/lib/services/empleadoService";
import { rolDataService } from "@/lib/services/rolService";
import { funcionDataService } from "@/lib/services/funcionService";
import { inventarioDataService } from "@/lib/services/inventarioService";
import { userDataService } from "@/lib/services/userService";
import { valeDataService } from "@/lib/services/valeService";
// import { bitacoraDataService } from "@/lib/services/bitacoraService";
// import { archivoDataService } from "@/lib/services/archivoService";

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

export const inventarioConfig: EntityConfig<Inventario> = {
  entityName: "Inventario",
  entityNamePlural: "Inventarios",
  basePath: "/private/inventarios",
  dataService: inventarioDataService,
  formFields: [
    {
      name: "clave",
      label: "Clave",
      type: "text",
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
      name: "tipo",
      label: "Tipo",
      type: "select",
      required: true,
      options: [
        { value: "Material", label: "Material" },
        { value: "Equipo", label: "Equipo" },
        { value: "Herramienta", label: "Herramienta" },
        { value: "Consumible", label: "Consumible" },
      ],
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "existencias",
      label: "Existencias",
      type: "number",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "cantidad",
      label: "Cantidad",
      type: "number",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "marca",
      label: "Marca",
      type: "text",
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
    { field: "clave", headerName: "Clave", width: 120 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "tipo", headerName: "Tipo", width: 120 },
    {
      field: "existencias",
      headerName: "Existencias",
      type: "number",
      width: 120,
    },
    { field: "cantidad", headerName: "Cantidad", type: "number", width: 120 },
    { field: "marca", headerName: "Marca", width: 120 },
    { field: "descripcion", headerName: "Descripción", flex: 1 },
  ],
  defaultValues: {},
};

export const userConfig: EntityConfig<User> = {
  entityName: "Usuario",
  entityNamePlural: "Usuarios",
  basePath: "/private/usuarios",
  dataService: userDataService,
  formFields: [
    {
      name: "username",
      label: "Usuario",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "apellidoPat",
      label: "Apellido Paterno",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "apellidoMat",
      label: "Apellido Materno",
      type: "text",
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "telefono",
      label: "Teléfono",
      type: "text",
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "funcion",
      label: "Función",
      type: "select",
      required: true,
      options: [
        { value: "Administrador", label: "Administrador" },
        { value: "Usuario", label: "Usuario" },
        { value: "Supervisor", label: "Supervisor" },
      ],
      gridSize: { xs: 12, sm: 6 },
    },
  ],
  tableColumns: [
    { field: "id", headerName: "ID", width: 80 },
    { field: "username", headerName: "Usuario", width: 120 },
    { field: "name", headerName: "Nombre", width: 120 },
    { field: "apellidoPat", headerName: "Apellido Pat.", width: 120 },
    { field: "apellidoMat", headerName: "Apellido Mat.", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "telefono", headerName: "Teléfono", width: 120 },
    { field: "funcion", headerName: "Función", width: 120 },
  ],
  defaultValues: {},
};

export const valeConfig: EntityConfig<Vale> = {
  entityName: "Vale",
  entityNamePlural: "Vales",
  basePath: "/private/vales",
  dataService: valeDataService,
  formFields: [
    {
      name: "dateDebited",
      label: "Fecha",
      type: "date",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "hourDebited",
      label: "Hora",
      type: "time",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "quantityMaterial",
      label: "Cantidad de Material",
      type: "number",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "requestingArea",
      label: "Área Solicitante",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "requestingEmployee",
      label: "Empleado Solicitante",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "materialInventory",
      label: "Material del Inventario",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "deliveryArea",
      label: "Área de Entrega",
      type: "text",
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "deliveryEmployee",
      label: "Empleado de Entrega",
      type: "text",
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "observations",
      label: "Observaciones",
      type: "textarea",
      gridSize: { xs: 12 },
    },
  ],
  tableColumns: [
    { field: "id", headerName: "ID", width: 80 },
    { field: "dateDebited", headerName: "Fecha", type: "date", width: 120 },
    { field: "hourDebited", headerName: "Hora", width: 100 },
    {
      field: "quantityMaterial",
      headerName: "Cantidad",
      type: "number",
      width: 100,
    },
    { field: "requestingArea", headerName: "Área Solicitante", width: 140 },
    {
      field: "requestingEmployee",
      headerName: "Empleado Solicitante",
      width: 160,
    },
    { field: "materialInventory", headerName: "Material", width: 150 },
    { field: "deliveryArea", headerName: "Área Entrega", width: 140 },
    { field: "deliveryEmployee", headerName: "Empleado Entrega", width: 150 },
  ],
  defaultValues: {},
};

/*
export const bitacoraConfig: EntityConfig<Bitacora> = {
  entityName: "Bitácora",
  entityNamePlural: "Bitácoras",
  basePath: "/private/bitacoras",
  dataService: bitacoraDataService,
  formFields: [
    {
      name: "fecha",
      label: "Fecha",
      type: "date",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "hora",
      label: "Hora",
      type: "time",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "motivo",
      label: "Motivo",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "empleado",
      label: "Empleado",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "entrada",
      label: "Entrada",
      type: "textarea",
      required: true,
      gridSize: { xs: 12 },
    },
    {
      name: "observaciones",
      label: "Observaciones",
      type: "textarea",
      gridSize: { xs: 12 },
    },
  ],
  tableColumns: [
    { field: "id", headerName: "ID", width: 80 },
    { field: "fecha", headerName: "Fecha", type: "date", width: 120 },
    { field: "hora", headerName: "Hora", width: 100 },
    { field: "motivo", headerName: "Motivo", width: 150 },
    { field: "empleado", headerName: "Empleado", width: 150 },
    { field: "entrada", headerName: "Entrada", flex: 1 },
  ],
  defaultValues: {},
};

export const archivoConfig: EntityConfig<Archivo> = {
  entityName: "Archivo",
  entityNamePlural: "Archivos",
  basePath: "/private/archivos",
  dataService: archivoDataService,
  formFields: [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "tipo",
      label: "Tipo",
      type: "text",
      required: true,
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "url",
      label: "URL",
      type: "text",
      required: true,
      gridSize: { xs: 12 },
    },
    {
      name: "tamano",
      label: "Tamaño",
      type: "text",
      gridSize: { xs: 12, sm: 6 },
    },
    {
      name: "fechaCreacion",
      label: "Fecha de Creación",
      type: "datetime-local",
      gridSize: { xs: 12, sm: 6 },
    },
  ],
  tableColumns: [
    { field: "id", headerName: "ID", width: 80 },
    { field: "nombre", headerName: "Nombre", width: 200 },
    { field: "tipo", headerName: "Tipo", width: 120 },
    { field: "tamano", headerName: "Tamaño", width: 120 },
    {
      field: "fechaCreacion",
      headerName: "Fecha Creación",
      type: "dateTime",
      width: 160,
    },
    { field: "url", headerName: "URL", flex: 1 },
  ],
  defaultValues: {},
};
*/
