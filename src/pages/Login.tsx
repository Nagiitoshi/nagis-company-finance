
import { LoginForm } from "../components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">FinançasPessoais</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gerencie suas finanças de forma simples e eficiente
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
