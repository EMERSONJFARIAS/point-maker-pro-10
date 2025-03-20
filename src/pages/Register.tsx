
import React from 'react';
import AuthLayout from '@/components/AuthLayout';
import RegistrationForm from '@/components/RegistrationForm';

const Register = () => {
  return (
    <div className="page-transition">
      <AuthLayout 
        title="Cadastro de Funcionário"
        subtitle="Preencha os dados abaixo para criar sua conta"
      >
        <RegistrationForm />
      </AuthLayout>
    </div>
  );
};

export default Register;
