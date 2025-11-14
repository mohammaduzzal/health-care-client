import { UserRole } from "@/lib/auth-utils";

export interface userInterface {
  name : string;
  email: string;
  role:  UserRole;
}