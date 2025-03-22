
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the form schema
const formSchema = z.object({
  username: z.string().min(1, { message: "Nome de usuário é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock user database for demonstration
const mockUsers = [
  { username: "demo", password: "demo123" },
  { username: "admin", password: "admin123" },
  // We'll check against real username in console logs
  { username: "GABRIEL_SANTOS", password: "Gabi25" }
];

// Define a type for registered users
type RegisteredUser = {
  username: string;
  password: string;
  name: string;
  email: string;
  // Add other fields as needed
};

const LoginForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUser[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load registered users from localStorage on component mount
  useEffect(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) {
      try {
        const parsedUsers = JSON.parse(savedUsers);
        setRegisteredUsers(parsedUsers);
        console.log("Loaded registered users:", parsedUsers);
      } catch (error) {
        console.error("Error parsing registered users:", error);
      }
    }
  }, []);

  // Set up the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    setLoginError(null);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Login data:", data);
      console.log("Registered users:", registeredUsers);
      setIsSubmitting(false);
      
      // First check in registered users from localStorage
      const registeredUser = registeredUsers.find(user => user.username === data.username);
      
      if (registeredUser) {
        // User found in registered users
        if (registeredUser.password === data.password) {
          // Success case for registered user
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo ao sistema Point Maker.",
            variant: "default",
          });
          
          // Navigate to dashboard after successful login
          navigate("/dashboard");
          return;
        } else {
          // Password doesn't match for registered user
          setLoginError("Senha incorreta. Por favor, tente novamente.");
          return;
        }
      }
      
      // If not found in registered users, check in mock users
      const mockUser = mockUsers.find(user => user.username === data.username);
      
      // User not found in both registered and mock users
      if (!mockUser) {
        setLoginError("Usuário não encontrado. Verifique o nome de usuário ou registre-se.");
        return;
      }
      
      // Password doesn't match for mock user
      if (mockUser.password !== data.password) {
        setLoginError("Senha incorreta. Por favor, tente novamente.");
        return;
      }
      
      // Success case for mock user
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao sistema Point Maker.",
        variant: "default",
      });
      
      // Navigate to dashboard after successful login
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="w-full animate-slide-up">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {loginError && (
            <Alert variant="destructive" className="animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{loginError}</AlertDescription>
            </Alert>
          )}
          
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de Usuário</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Seu nome de usuário" 
                    {...field} 
                    className="input-focus-effect" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Sua senha" 
                    type="password" 
                    {...field} 
                    className="input-focus-effect" 
                  />
                </FormControl>
                <div className="flex justify-end mt-1">
                  <Link 
                    to="/recovery" 
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
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
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
