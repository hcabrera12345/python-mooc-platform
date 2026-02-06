import { Button } from "@/components/ui/button";
import { Terminal, Brain, Rocket, Code2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 w-full max-w-5xl flex flex-col items-center text-center gap-8">
        <div className="glass-card px-4 py-2 rounded-full border border-white/10 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-sm font-mono text-zinc-400">
            Powered by &nbsp;<span className="text-secondary">AI & Pyodide</span>
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-2xl animate-in fade-in zoom-in-50 duration-700 delay-100">
          Python para el <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
            Futuro Digital
          </span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          Una plataforma MOOC de próxima generación. Aprende a programar con tu propio
          Tutor IA personal, ejecuta código en tiempo real y domina el futuro.
        </p>

        <div className="flex flex-row gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <Link href="/course/what-is-python">
            <Button size="lg" className="text-lg">
              Empezar Curso
            </Button>
          </Link>
          <Button variant="glass" size="lg" className="text-lg">
            Ver Temario
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 text-center hover:bg-white/5 transition-colors">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Code2 size={32} />
            </div>
            <h3 className="text-xl font-semibold">Editor Interactivo</h3>
            <p className="text-muted-foreground text-sm">
              Entorno estilo Jupyter embebido. Sin instalaciones. Ejecución instantánea en tu navegador.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 text-center hover:bg-white/5 transition-colors">
            <div className="p-3 bg-secondary/10 rounded-xl text-secondary">
              <Brain size={32} />
            </div>
            <h3 className="text-xl font-semibold">Tutor IA 24/7</h3>
            <p className="text-muted-foreground text-sm">
              Feedback inteligente en tiempo real. No te da la solución, te enseña a encontrarla.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl flex flex-col items-center gap-4 text-center hover:bg-white/5 transition-colors">
            <div className="p-3 bg-accent/10 rounded-xl text-accent">
              <Rocket size={32} />
            </div>
            <h3 className="text-xl font-semibold">Gamificación</h3>
            <p className="text-muted-foreground text-sm">
              Progreso dinámico, rachas y medallas. Convierte el aprendizaje en una experiencia adictiva.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
