
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, LucideCircleDot } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  
  // Smooth scroll effect for the buttons
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add smooth fade-in effect when the page loads
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
    
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <header className="w-full py-4 px-6 flex justify-between items-center bg-white/80 backdrop-blur-md fixed top-0 z-10 border-b">
        <Logo size="md" />
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>Entrar</Button>
          <Button onClick={() => navigate('/register')}>
            Cadastre-se <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen pt-24 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Controle de ponto 
              <span className="text-primary block">simples e elegante</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Registre o ponto dos seus funcionários com facilidade e tenha controle total sobre a jornada de trabalho da sua equipe.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <Button size="lg" onClick={() => navigate('/register')} className="button-hover-effect">
                Começar agora
              </Button>
              <Button size="lg" variant="outline" onClick={scrollToFeatures} className="button-hover-effect">
                Saiba mais
              </Button>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="aspect-square max-w-xl mx-auto relative">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Clock className="w-1/2 h-1/2 text-primary" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">Funcionalidades</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tudo o que você precisa para gerenciar o ponto dos seus funcionários de forma eficiente.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Registro simplificado',
                description: 'Interface intuitiva para registro de ponto, com poucos cliques.',
                delay: 100
              },
              {
                title: 'Relatórios detalhados',
                description: 'Acompanhe horas trabalhadas, faltas e atrasos com relatórios completos.',
                delay: 200
              },
              {
                title: 'Geolocalização',
                description: 'Registre o ponto com localização precisa para maior segurança.',
                delay: 300
              },
              {
                title: 'Banco de horas',
                description: 'Gerenciamento automático de banco de horas e compensações.',
                delay: 400
              },
              {
                title: 'Notificações',
                description: 'Lembretes e alertas personalizados para sua equipe.',
                delay: 500
              },
              {
                title: 'Exportação de dados',
                description: 'Exporte relatórios em diversos formatos para sua conveniência.',
                delay: 600
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="glass-panel p-6 opacity-0 animate-on-scroll"
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <LucideCircleDot className="text-primary h-5 w-5" />
                  <h3 className="text-xl font-medium">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center opacity-0 animate-on-scroll">
            <Button size="lg" onClick={() => navigate('/register')} className="button-hover-effect">
              Experimente grátis por 30 dias
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-12 px-4 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <Logo />
          <div className="mt-4 md:mt-0 text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Point Maker. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
