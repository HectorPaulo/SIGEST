import type { User, UserInsert } from "@/types/user";
import type { DataService, ValidationResult } from "@/types/generic";
import type {
  GridFilterModel,
  GridPaginationModel,
  GridSortModel,
} from "@mui/x-data-grid";
import {
  CreateUser,
  UpdateUser,
  GetAllUsers,
  GetUserById,
  DeleteUser,
} from "@/lib/Controllers/UsersController";

async function getMany({
  paginationModel,
  filterModel,
  sortModel,
}: {
  paginationModel: GridPaginationModel;
  sortModel: GridSortModel;
  filterModel: GridFilterModel;
}): Promise<{ items: User[]; itemCount: number }> {
  try {
    const response = await GetAllUsers();
    let users: User[] = response.data || [];

    // Asegurarse de que todos los elementos tengan id como string
    users = users.map((user) => ({
      ...user,
      id: String(user.id),
    }));

    // Apply filters
    if (filterModel?.items?.length) {
      filterModel.items.forEach(({ field, value, operator }) => {
        if (!field || value == null) {
          return;
        }

        users = users.filter((user) => {
          const itemValue = user[field as keyof User];

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
            default:
              return true;
          }
        });
      });
    }

    // Apply sorting
    if (sortModel?.length) {
      users.sort((a, b) => {
        for (const { field, sort } of sortModel) {
          if (a[field as keyof User] < b[field as keyof User]) {
            return sort === "asc" ? -1 : 1;
          }
          if (a[field as keyof User] > b[field as keyof User]) {
            return sort === "asc" ? 1 : -1;
          }
        }
        return 0;
      });
    }

    // Apply pagination
    const start = paginationModel.page * paginationModel.pageSize;
    const end = start + paginationModel.pageSize;
    const paginatedUsers = users.slice(start, end);

    return {
      items: paginatedUsers,
      itemCount: users.length,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("No se pudieron obtener los usuarios");
  }
}

async function getOne(userId: string): Promise<User> {
  try {
    const response = await GetUserById(parseInt(userId));
    if (!response.data) {
      throw new Error("User not found");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("No se pudo obtener el usuario");
  }
}

async function createOne(data: Omit<User, "id">): Promise<User> {
  try {
    const userData = { ...data, id: "", password: "" } as UserInsert;
    const response = await CreateUser(userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("No se pudo crear el usuario");
  }
}

async function updateOne(userId: string, data: Partial<User>): Promise<User> {
  try {
    // Para usuarios, actualizamos por email (basado en el controlador)
    const userData = { id: userId, profileImg: null, ...data } as User;
    const response = await UpdateUser(userData.email || "", userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("No se pudo actualizar el usuario");
  }
}

async function deleteOne(userId: string): Promise<void> {
  try {
    await DeleteUser(userId);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("No se pudo eliminar el usuario");
  }
}

function validate(user: Partial<User>): ValidationResult {
  let issues: ValidationResult["issues"] = [];

  if (!user.username) {
    issues = [
      ...issues,
      { message: "Username is required", path: ["username"] },
    ];
  }

  if (!user.name) {
    issues = [...issues, { message: "Nombre is required", path: ["name"] }];
  }

  if (!user.apellidoPat) {
    issues = [
      ...issues,
      { message: "Apellido paterno is required", path: ["apellidoPat"] },
    ];
  }

  if (!user.email) {
    issues = [...issues, { message: "Email is required", path: ["email"] }];
  }

  if (!user.funcion) {
    issues = [...issues, { message: "Función is required", path: ["funcion"] }];
  }

  return { issues };
}

export const userDataService: DataService<User> = {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  validate,
};
