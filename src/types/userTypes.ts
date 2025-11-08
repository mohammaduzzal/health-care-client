export interface userInterface {
  id: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT";
  exp: number;
  iat: number;
}