
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextType, User } from "../types";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Mock user para simulação da API
const mockUser: User = {
  id: "1",
  name: "Usuário Teste",
  email: "usuario@teste.com",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulação de chamada de API
    try {
      // Mock de validação simples
      if (email === "usuario@teste.com" && password === "senha123") {
        // Em um cenário real, aqui seria feita a chamada para o backend
        // e o token JWT seria armazenado
        localStorage.setItem("user", JSON.stringify(mockUser));
        setUser(mockUser);
        toast.success("Login realizado com sucesso!");
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      toast.error("Falha no login. Por favor, verifique suas credenciais.");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Você saiu da sua conta");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
