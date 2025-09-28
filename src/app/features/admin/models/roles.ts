import { User } from "./user";

export interface Roles {
    id: number;
    name: string;
    description?: string;
}

export interface UserWithRole extends Omit<User, 'role'> {
  role: Roles; // now role is the full object
}