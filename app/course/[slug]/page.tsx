"use client";

import React from "react";
import { useParams } from "next/navigation";
import { curriculum } from "@/lib/curriculum";
import CourseSidebar from "@/components/CourseSidebar";
import CodeEditor from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CoursePage() {
    const params = useParams();
    const slug = params.slug as string;

    // flattened list to find current lesson
    const allLessons = curriculum.flatMap((week) => week.lessons);
    const lesson = allLessons.find((l) => l.slug === slug);

    if (!lesson) {
        return (
            <div className="flex h-screen items-center justify-center bg-black text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404</h1>
                    <p className="text-zinc-500 mb-8">Lección no encontrada</p>
                    <Link href="/" className="text-primary hover:underline">Volver al inicio</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-black text-foreground overflow-hidden">
            {/* Sidebar - Hidden on mobile, toggleable ideally */}
            <div className="hidden md:block h-full">
                <CourseSidebar currentSlug={slug} />
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="h-14 border-b border-white/5 bg-zinc-950 flex items-center justify-between px-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="md:hidden text-zinc-400 hover:text-white">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="font-semibold text-sm md:text-base truncate">
                            {lesson.title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="hidden md:flex">
                            Pedir Ayuda (IA)
                        </Button>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Siguiente <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </header>

                {/* Main Split View */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Content Area (Left) */}
                    <div className="flex-1 lg:w-1/2 overflow-y-auto p-6 md:p-8 space-y-8 bg-[#0a0a0a]">
                        <div className="prose prose-invert prose-zinc max-w-none">
                            <h2>Bienvenido a la lección</h2>
                            <p className="text-lg text-zinc-300">
                                En esta sesión aprenderemos los fundamentos clave.
                                {/* Placeholder content based on type */}
                                {lesson.type === 'video' ? " Mira el video a continuación para entender los conceptos." : " Es hora de escribir código."}
                            </p>

                            {lesson.type === 'video' && (
                                <div className="aspect-video bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
                                    </div>
                                </div>
                            )}

                            <h3>Instrucciones</h3>
                            <ul>
                                <li>Analiza el problema planteado.</li>
                                <li>Utiliza el editor de la derecha.</li>
                                <li>Ejecuta tu código y verifica la salida.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Editor Area (Right) */}
                    <div className="flex-1 lg:w-1/2 h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l border-white/10 bg-[#1e1e1e]">
                        <CodeEditor initialCode={`# ${lesson.title}\n\n# Escribe tu solución aquí:\nprint("Empezando...")`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
