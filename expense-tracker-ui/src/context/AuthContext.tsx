import React, { createContext, useState, ReactNode, useContext } from "react";

// Define user type (adjust based on your user data shape)
interface User {
  id: number;
  name: string;
  email: string;
}

// Define the context shape
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create context with initial null value
const AuthContext = createContext<AuthContextType | null>(null);

// Provider Props type
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Dummy login function, replace with your API call
  const login = async (email: string, password: string) => {
    // Example: Replace this with your API call to authenticate
    // Here we just simulate a user login
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser({ id: 1, name: "John Doe", email });
        resolve();
      }, 1000);
    });
  };

  // Logout function clears the user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext more easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
