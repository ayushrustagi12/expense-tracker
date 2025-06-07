export type AuthMode = "login" | "register" | "forgot-password";

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}
