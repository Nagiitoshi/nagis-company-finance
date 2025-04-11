
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

// Array de usuários cadastrados
const registeredUsers = [
  {
    id: "1",
    name: "Usuário Teste",
    email: "usuario@teste.com",
    password: "senha123"
  }
];

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
      // Verificar se o usuário existe
      const userFound = registeredUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (userFound) {
        const { password, ...userWithoutPassword } = userFound;
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        toast.success("Login realizado com sucesso!");
      } else {
        throw new Error("Credenciais inválidas");
      }
    } catch (error) {
      toast.error("Falha no login. Por favor, verifique suas credenciais.");
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Verificar se o email já está em uso
      if (registeredUsers.some(u => u.email === email)) {
        toast.error("Este email já está em uso.");
        throw new Error("Email já em uso");
      }

      // Criar novo usuário
      const newUser = {
        id: `${registeredUsers.length + 1}`,
        name,
        email,
        password
      };

      // Em um cenário real, aqui seria feita a chamada para o backend
      registeredUsers.push(newUser);
      
      // Login automático após o registro
      const { password: _, ...userWithoutPassword } = newUser;
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);
      
      toast.success("Registro realizado com sucesso!");
    } catch (error) {
      if ((error as Error).message === "Email já em uso") {
        throw error;
      }
      toast.error("Falha no registro. Por favor, tente novamente.");
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
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
