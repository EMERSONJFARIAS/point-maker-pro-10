import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, parse, isValid } from "date-fns";
import { CalendarIcon, CheckCircle, ChevronRight, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from '@/lib/utils';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  cpf: z
    .string()
    .length(11, { message: "CPF deve ter exatamente 11 dígitos" })
    .regex(/^\d+$/, { message: "CPF deve conter apenas números" }),
  birthDate: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  birthDateInput: z.string().optional(),
  email: z.string().email({ message: "Email inválido" }),
  position: z.string().min(2, { message: "Cargo é obrigatório" }),
  username: z
    .string()
    .min(3, { message: "Nome de usuário deve ter pelo menos 3 caracteres" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Nome de usuário deve conter apenas letras, números e underscore",
    }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  // Set up the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      cpf: "",
      email: "",
      position: "",
      username: "",
      password: "",
      confirmPassword: "",
      birthDateInput: "",
    },
  });

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data:", data);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      toast({
        title: "Registro concluído com sucesso!",
        description: "Você já pode fazer login no sistema.",
        variant: "default",
      });
      
      // Reset form after success
      setTimeout(() => {
        form.reset();
        setSubmitSuccess(false);
      }, 3000);
    }, 1500);
  };

  // Handle CPF input formatting
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      form.setValue('cpf', value);
    }
  };

  // Handle manual birthdate input
  const handleBirthDateInputChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (date: Date | undefined) => void) => {
    const inputValue = e.target.value;
    form.setValue('birthDateInput', inputValue);
    
    // Try to parse the date
    if (inputValue) {
      try {
        const parsedDate = parse(inputValue, 'dd/MM/yyyy', new Date());
        if (isValid(parsedDate)) {
          onChange(parsedDate);
        }
      } catch (error) {
        // Invalid date format, just update the input field
      }
    }
  };

  if (submitSuccess) {
    return (
      <div className="flex flex-col items-center p-8 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-medium mb-2">Cadastro realizado!</h2>
        <p className="text-center text-muted-foreground mb-6">
          Seu cadastro foi realizado com sucesso. Agora você pode fazer login no sistema.
        </p>
        <Button asChild>
          <Link to="/login" className="flex items-center gap-2">
            Ir para login <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full animate-slide-up">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Funcionário</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite seu nome completo" 
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
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Apenas números"
                    value={field.value}
                    onChange={handleCpfChange}
                    maxLength={11}
                    className="input-focus-effect"
                  />
                </FormControl>
                <FormDescription>
                  Digite apenas os 11 números do CPF, sem pontos ou traços
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Modified birthDate field to allow manual input */}
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Nascimento</FormLabel>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="DD/MM/AAAA"
                        value={form.watch('birthDateInput') || (field.value ? format(field.value, 'dd/MM/yyyy') : '')}
                        onChange={(e) => handleBirthDateInputChange(e, field.onChange)}
                        className="input-focus-effect"
                      />
                    </FormControl>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        size="icon"
                        className="px-3"
                        type="button"
                      >
                        <CalendarIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          if (date) {
                            form.setValue('birthDateInput', format(date, 'dd/MM/yyyy'));
                          }
                        }}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormDescription>
                  Digite a data no formato DD/MM/AAAA ou selecione no calendário
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="exemplo@email.com" 
                    type="email" 
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
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Seu cargo na empresa" 
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome de Usuário</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Escolha um nome de usuário" 
                    {...field} 
                    className="input-focus-effect" 
                  />
                </FormControl>
                <FormDescription>
                  Use apenas letras, números e underscore (_)
                </FormDescription>
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
                    placeholder="Crie uma senha" 
                    type="password" 
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Confirme sua senha" 
                    type="password" 
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
              {isSubmitting ? "Registrando..." : "Cadastrar"}
            </Button>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
