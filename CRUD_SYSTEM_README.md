# Sistema CRUD Genérico

Este sistema permite crear fácilmente operaciones CRUD (Create, Read, Update, Delete) para diferentes entidades como áreas, empleados, roles, funciones, usuarios, etc.

## 📁 Estructura del Sistema

```
src/
├── types/
│   ├── generic.ts          # Tipos genéricos para el sistema CRUD
│   ├── area.ts             # Tipos específicos para Areas
│   ├── empleado.ts         # Tipos específicos para Empleados
│   └── ...
├── lib/
│   ├── services/           # Servicios de datos
│   │   ├── areaService.ts
│   │   ├── empleadoService.ts
│   │   └── ...
│   └── config/
│       └── entityConfigs.ts # Configuraciones de entidades
├── components/private/
│   ├── GenericList/        # Lista genérica reutilizable
│   ├── GenericForm/        # Formulario genérico reutilizable
│   ├── GenericCreate/      # Componente crear genérico
│   ├── GenericEdit/        # Componente editar genérico
│   └── GenericShow/        # Componente mostrar genérico
└── app/private/
    ├── areas/              # Páginas específicas para areas
    ├── empleados/          # Páginas específicas para empleados
    └── ...
```

## 🚀 Cómo agregar una nueva entidad

### 1. Crear los tipos TypeScript

```typescript
// src/types/miEntidad.ts
export interface MiEntidadInsert {
  nombre: string;
  descripcion?: string;
  // ... otros campos
}

export interface MiEntidad {
  id: string;
  nombre: string;
  descripcion: string;
  // ... otros campos
}
```

### 2. Crear el servicio de datos

```typescript
// src/lib/services/miEntidadService.ts
import type { MiEntidad, MiEntidadInsert } from "@/types/miEntidad";
import type { DataService } from "@/types/generic";

// Datos iniciales (opcional)
const INITIAL_DATOS: MiEntidad[] = [
  {
    id: "1",
    nombre: "Ejemplo",
    descripcion: "Descripción del ejemplo",
  },
];

// Implementar todas las funciones del DataService
async function getMany({ paginationModel, filterModel, sortModel }) {
  // Implementar lógica de obtener múltiples elementos
}

async function getOne(id: string): Promise<MiEntidad> {
  // Implementar lógica de obtener un elemento
}

async function createOne(data: MiEntidadInsert): Promise<MiEntidad> {
  // Implementar lógica de crear elemento
}

async function updateOne(
  id: string,
  data: Partial<MiEntidadInsert>
): Promise<MiEntidad> {
  // Implementar lógica de actualizar elemento
}

async function deleteOne(id: string): Promise<void> {
  // Implementar lógica de eliminar elemento
}

function validate(data: Partial<MiEntidad>): ValidationResult {
  // Implementar validaciones
}

export const miEntidadDataService: DataService<MiEntidad> = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
};
```

### 3. Crear la configuración de la entidad

```typescript
// Agregar en src/lib/config/entityConfigs.ts
export const miEntidadConfig: EntityConfig<MiEntidad> = {
  entityName: "Mi Entidad",
  entityNamePlural: "Mis Entidades",
  basePath: "/mi-entidad",
  dataService: miEntidadDataService,
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
```

### 4. Crear las páginas

#### Lista (página principal)

```tsx
// src/app/private/mi-entidad/page.tsx
"use client";

import GenericList from "@/components/private/GenericList/GenericList";
import { miEntidadConfig } from "@/lib/config/entityConfigs";
import type { MiEntidad } from "@/types/miEntidad";

export default function MiEntidadPage() {
  return <GenericList<MiEntidad> config={miEntidadConfig} />;
}
```

#### Crear nuevo

```tsx
// src/app/private/mi-entidad/new/page.tsx
"use client";

import GenericCreate from "@/components/private/GenericCreate/GenericCreate";
import { miEntidadConfig } from "@/lib/config/entityConfigs";
import type { MiEntidad } from "@/types/miEntidad";

export default function MiEntidadNewPage() {
  return <GenericCreate<MiEntidad> config={miEntidadConfig} />;
}
```

#### Mostrar detalles

```tsx
// src/app/private/mi-entidad/[itemId]/page.tsx
"use client";

import GenericShow from "@/components/private/GenericShow/GenericShow";
import { miEntidadConfig } from "@/lib/config/entityConfigs";
import type { MiEntidad } from "@/types/miEntidad";

export default function MiEntidadShowPage() {
  return <GenericShow<MiEntidad> config={miEntidadConfig} />;
}
```

#### Editar

```tsx
// src/app/private/mi-entidad/[itemId]/edit/page.tsx
"use client";

import GenericEdit from "@/components/private/GenericEdit/GenericEdit";
import { miEntidadConfig } from "@/lib/config/entityConfigs";
import type { MiEntidad } from "@/types/miEntidad";

export default function MiEntidadEditPage() {
  return <GenericEdit<MiEntidad> config={miEntidadConfig} />;
}
```

## 📋 Tipos de campos disponibles

### Campos de formulario (`FormFieldConfig`)

- **text**: Campo de texto simple
- **textarea**: Campo de texto multilínea
- **number**: Campo numérico
- **date**: Selector de fecha
- **select**: Lista desplegable con opciones
- **checkbox**: Casilla de verificación

### Ejemplo de configuración de campos:

```typescript
formFields: [
  {
    name: "nombre",
    label: "Nombre completo",
    type: "text",
    required: true,
    gridSize: { xs: 12, sm: 6 },
  },
  {
    name: "fechaNacimiento",
    label: "Fecha de nacimiento",
    type: "date",
    required: true,
    gridSize: { xs: 12, sm: 6 },
  },
  {
    name: "estado",
    label: "Estado",
    type: "select",
    options: [
      { value: "activo", label: "Activo" },
      { value: "inactivo", label: "Inactivo" },
    ],
    gridSize: { xs: 12, sm: 6 },
  },
  {
    name: "esVIP",
    label: "Cliente VIP",
    type: "checkbox",
    gridSize: { xs: 12, sm: 6 },
  },
];
```

## 🎯 Características del sistema

✅ **Componentes reutilizables**: Lista, formularios, crear, editar, mostrar  
✅ **Validación automática**: Basada en la configuración de cada entidad  
✅ **Filtrado y ordenamiento**: Integrado con Material-UI DataGrid  
✅ **Paginación**: Manejo automático de grandes cantidades de datos  
✅ **Notificaciones**: Feedback automático para todas las operaciones  
✅ **Navegación**: Breadcrumbs y navegación automática  
✅ **TypeScript**: Tipado fuerte en todo el sistema  
✅ **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🔧 Personalización avanzada

Si necesitas personalizar algún comportamiento específico, puedes:

1. **Extender los servicios de datos** para agregar lógica personalizada
2. **Crear componentes específicos** para entidades que requieran UI especial
3. **Personalizar validaciones** en la función `validate` de cada servicio
4. **Agregar campos personalizados** extendiendo los tipos de campo disponibles

## 💡 Ejemplo completo

Revisa las implementaciones existentes de `areas`, `empleados`, `roles` y `funciones` para ver ejemplos completos del sistema en funcionamiento.

---

**¡Con este sistema, agregar nuevas entidades CRUD es tan simple como definir los tipos, crear el servicio y las páginas!** 🚀
