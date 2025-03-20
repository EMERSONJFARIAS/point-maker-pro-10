
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Clock, User, LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleClockIn = () => {
    toast({
      title: "Ponto registrado com sucesso!",
      description: `Entrada registrada às ${new Date().toLocaleTimeString()}`,
      variant: "default",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
      variant: "default",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md border-b sticky top-0 z-10">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">Usuário Demo</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full">
        <div className="mb-12 animate-slide-down">
          <h1 className="text-3xl font-bold mb-2">Bem-vindo, Usuário Demo!</h1>
          <p className="text-muted-foreground">
            Hoje é {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-8 animate-slide-up">
            <h2 className="text-xl font-medium mb-6">Registrar Ponto</h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg"></div>
                <Clock className="h-16 w-16 text-primary" strokeWidth={1.5} />
              </div>
              <Button size="lg" onClick={handleClockIn} className="button-hover-effect w-full">
                Registrar Ponto Agora
              </Button>
            </div>
          </div>
          
          <div className="glass-panel p-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h2 className="text-xl font-medium mb-6">Últimos Registros</h2>
            <div className="space-y-4">
              {[
                { type: 'Entrada', time: '08:00', date: 'Hoje' },
                { type: 'Saída', time: '12:00', date: 'Hoje' },
                { type: 'Entrada', time: '13:00', date: 'Hoje' },
                { type: 'Saída', time: '17:00', date: 'Ontem' },
                { type: 'Entrada', time: '08:00', date: 'Ontem' },
              ].map((record, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{record.type}</div>
                    <div className="text-sm text-muted-foreground">{record.date}</div>
                  </div>
                  <div className="text-lg">{record.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="glass-panel p-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-medium mb-6">Resumo do Mês</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-accent rounded-lg">
              <div className="text-sm text-muted-foreground">Horas Trabalhadas</div>
              <div className="text-2xl font-semibold">160h 30min</div>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <div className="text-sm text-muted-foreground">Banco de Horas</div>
              <div className="text-2xl font-semibold">+8h 15min</div>
            </div>
            <div className="p-4 bg-accent rounded-lg">
              <div className="text-sm text-muted-foreground">Faltas</div>
              <div className="text-2xl font-semibold">0 dias</div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-4 border-t">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Point Maker
          </div>
          <div className="text-sm text-muted-foreground">
            Versão 1.0.0
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
