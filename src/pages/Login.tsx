
import React from 'react';
import AuthLayout from '@/components/AuthLayout';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className="page-transition">
      <AuthLayout 
        title="Entrar"
        subtitle="Faça login para acessar sua conta"
        rightImage={false}
      >
        <LoginForm />
      </AuthLayout>
    </div>
  );
};

export default Login;
