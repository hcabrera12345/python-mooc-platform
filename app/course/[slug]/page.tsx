"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { curriculum } from "@/lib/curriculum";
import CourseSidebar from "@/components/CourseSidebar";
import CodeEditor from "@/components/CodeEditor";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function CoursePage() {
    const params = useParams();
    const router = useRouter(); // Import useRouter
    const slug = params.slug as string;

    // flattened list to find current lesson
    const allLessons = curriculum.flatMap((week) => week.lessons);
    const lessonIndex = allLessons.findIndex((l) => l.slug === slug);
    const lesson = allLessons[lessonIndex];
    const nextLesson = allLessons[lessonIndex + 1];

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
                        <Button
                            variant="outline"
                            size="sm"
                            className="hidden md:flex"
                            onClick={() => document.dispatchEvent(new CustomEvent("open-ai-tutor"))}
                        >
                            Pedir Ayuda (IA)
                        </Button>

                        {nextLesson ? (
                            <Link href={`/course/${nextLesson.slug}`}>
                                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                                    Siguiente <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        ) : (
                            <Button size="sm" className="bg-green-600 hover:bg-green-500" disabled>
                                Fin del Curso <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        )}
                    </div>
                </header>

                {/* Main Split View */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Content Area (Left) */}
                    <div className="flex-1 lg:w-1/2 overflow-y-auto p-6 md:p-8 space-y-8 bg-[#0a0a0a]">
                        <div className="prose prose-invert prose-zinc max-w-none">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                                    {lesson.type === 'video' ? "Conceptos Clave" : "Laboratorio de Código"}
                                </h2>
                                <p className="text-lg text-zinc-400 mt-2">
                                    {lesson.type === 'video'
                                        ? "Mira el video y analiza los ejemplos antes de pasar a la práctica."
                                        : "Utiliza el editor para resolver el desafío. El Tutor IA está disponible si te atascas."}
                                </p>
                            </div>

                            {lesson.type === 'video' && (
                                <div className="aspect-video w-full bg-zinc-900 rounded-xl border border-white/10 flex items-center justify-center relative overflow-hidden group cursor-pointer my-8 shadow-2xl">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                                    <div className="relative z-10 flex flex-col items-center gap-4 transition-transform duration-300 group-hover:scale-105">
                                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl group-hover:bg-primary/20 group-hover:border-primary/50 transition-colors">
                                            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-white border-b-[12px] border-b-transparent ml-2 group-hover:border-l-white" />
                                        </div>
                                        <span className="font-mono text-sm text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">Reproducir Lección</span>
                                    </div>
                                </div>
                            )}

                            <div className="glass-card p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                                {lesson.type === 'video' && (
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <div className="w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                                    </div>
                                )}
                                <ReactMarkdown
                                    components={{
                                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-6" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-white mt-8 mb-4 flex items-center gap-2" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-xl font-medium text-zinc-200 mt-6 mb-3" {...props} />,
                                        p: ({ node, ...props }) => <p className="text-zinc-400 leading-relaxed mb-4" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-zinc-400" {...props} />,
                                        li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                                        code: ({ node, ...props }) => <code className="bg-zinc-900/50 px-1.5 py-0.5 rounded text-primary font-mono text-sm border border-white/5" {...props} />,
                                        pre: ({ node, ...props }) => <pre className="bg-zinc-950 p-4 rounded-xl border border-white/10 overflow-x-auto my-4 text-sm" {...props} />,
                                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary/50 pl-4 py-1 italic text-zinc-500 my-4" {...props} />,
                                    }}
                                >
                                    {lesson.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    {/* Editor Area (Right) */}
                    <div className="flex-1 lg:w-1/2 h-1/2 lg:h-full border-t lg:border-t-0 lg:border-l border-white/10 bg-[#1e1e1e]">
                        <CodeEditor
                            key={lesson.slug} // Force reset on lesson change
                            initialCode={lesson.initialCode || `# ${lesson.title}\n\n# Escribe tu solución aquí:\nprint("Hola!")`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
