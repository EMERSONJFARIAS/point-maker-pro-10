
import React from 'react';
import AuthLayout from '@/components/AuthLayout';
import RecoveryForm from '@/components/RecoveryForm';

const Recovery = () => {
  return (
    <div className="page-transition">
      <AuthLayout 
        title="Recuperar Senha"
        subtitle="Enviaremos instruções para recuperar sua senha"
        rightImage={false}
      >
        <RecoveryForm />
      </AuthLayout>
    </div>
  );
};

export default Recovery;
