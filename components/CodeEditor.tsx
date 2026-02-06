"use client";

import React, { useEffect, useState, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { getPyodide } from "@/lib/pyodide";
import { Button } from "@/components/ui/button";
import { Play, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeEditorProps {
    initialCode?: string;
}

export default function CodeEditor({ initialCode = "# Escribe tu código aquí\nprint('Hola, Mundo!')" }: CodeEditorProps) {
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isPyodideLoading, setIsPyodideLoading] = useState(true);
    const editorRef = useRef<any>(null);

    useEffect(() => {
        // Preload Pyodide
        getPyodide()
            .then(() => setIsPyodideLoading(false))
            .catch((err) => {
                console.error("Failed to load Pyodide", err);
                const message = err instanceof Error ? err.message : String(err);
                setOutput((prev) => [...prev, `Error: Failed to load Python environment: ${message}`]);
            });
    }, []);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    const runCode = async () => {
        if (isRunning) return;
        setIsRunning(true);
        const code = editorRef.current.getValue();
        setOutput([]); // Clear previous output

        try {
            const pyodide = await getPyodide();

            // Capture stdout
            pyodide.setStdout({
                batched: (msg: string) => {
                    setOutput((prev) => [...prev, msg]);
                },
            });

            await pyodide.runPythonAsync(code);
        } catch (error: any) {
            setOutput((prev) => [...prev, `Error: ${error.message}`]);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full rounded-xl overflow-hidden glass border border-white/10 shadow-2xl">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="ml-3 text-xs text-zinc-400 font-mono">main.py</span>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setOutput([])}
                        title="Limpiar consola"
                    >
                        <Trash2 className="w-4 h-4 text-zinc-400" />
                    </Button>
                    <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-500 text-white font-semibold shadow-[0_0_15px_rgba(22,163,74,0.4)]"
                        onClick={runCode}
                        disabled={isPyodideLoading || isRunning}
                    >
                        {isRunning ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <Play className="w-4 h-4 mr-2" />
                        )}
                        {isPyodideLoading ? "Cargando..." : "Ejecutar"}
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row h-full">
                {/* Editor Area */}
                <div className="flex-1 h-[60vh] md:h-full relative bg-[#1e1e1e]">
                    <Editor
                        height="100%"
                        defaultLanguage="python"
                        defaultValue={initialCode}
                        theme="vs-dark"
                        onMount={handleEditorDidMount}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: "Geist Mono, monospace",
                            padding: { top: 16 },
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </div>

                {/* Console/Output Area */}
                <div className="h-[40vh] md:h-full md:w-[40%] bg-[#0d0d0d] border-t md:border-t-0 md:border-l border-white/10 flex flex-col">
                    <div className="px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-zinc-400 font-mono uppercase tracking-wider">
                        Terminal
                    </div>
                    <div className="flex-1 p-4 font-mono text-sm overflow-y-auto font-medium space-y-1">
                        {output.length === 0 && (
                            <span className="text-zinc-600 italic">Esperando salida...</span>
                        )}
                        {output.map((line, i) => (
                            <div key={i} className="text-zinc-300 break-words border-b border-transparent hover:border-white/5">
                                <span className="text-green-500 mr-2">➜</span>{line}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
