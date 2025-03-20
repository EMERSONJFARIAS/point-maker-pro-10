
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the form schema
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({ message: "Email inválido" }),
});

type FormValues = z.infer<typeof formSchema>;

const RecoveryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  const { toast } = useToast();

  // Set up the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setRecoveryError(null);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Recovery email:", data.email);
      setIsSubmitting(false);
      
      // For demo purposes - show error for non-existent email
      if (data.email === "nonexistent@example.com") {
        setRecoveryError("Email não encontrado. Verifique o email informado ou cadastre-se.");
        return;
      }
      
      // Success case
      setRecoverySuccess(true);
      toast({
        title: "Email de recuperação enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
        variant: "default",
      });
    }, 1000);
  };

  if (recoverySuccess) {
    return (
      <div className="flex flex-col items-center p-8 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Mail className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-medium mb-2">Email enviado!</h2>
        <p className="text-center text-muted-foreground mb-6">
          Enviamos instruções para redefinir sua senha para o email fornecido. Por favor, verifique sua caixa de entrada.
        </p>
        <Button asChild variant="outline">
          <Link to="/login">Voltar para login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full animate-slide-up">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {recoveryError && (
            <Alert variant="destructive" className="animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{recoveryError}</AlertDescription>
            </Alert>
          )}
          
          <div className="mb-6">
            <p className="text-muted-foreground">
              Digite seu email cadastrado abaixo e enviaremos um link para redefinir sua senha.
            </p>
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Seu email cadastrado" 
                    type="email"
                    {...field} 
                    className="input-focus-effect" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full button-hover-effect"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar instruções"}
            </Button>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Lembrou sua senha?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Voltar para login
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RecoveryForm;
