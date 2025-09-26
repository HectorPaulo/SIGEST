import React from "react";

export interface UserInsert {
  id: string;
  email: string;
  password: string;
  profileImg?: string;
  username: string;
  name: string;
  apellidoPat: string;
  apellidoMat: string;
  funcion: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  apellidoPat: string;
  apellidoMat: string;
  email: string;
  profileImg: string | null;
  funcion: string;
}

export interface UserContext {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  hasPermission: () => boolean;
  logout: () => Promise<void>;
}
