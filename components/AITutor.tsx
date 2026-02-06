"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Send, Bot, X } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AITutorProps {
    code: string;
    consoleOutput: string[];
}

export default function AITutor({ code, consoleOutput }: AITutorProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        document.addEventListener("open-ai-tutor", handleOpen);
        return () => document.removeEventListener("open-ai-tutor", handleOpen);
    }, []);

    // Manual input management
    const [input, setInput] = useState("");

    // Use sendMessage instead of append, and derive loading state from status
    const { messages, sendMessage, status } = useChat({
        api: "/api/tutor",
        body: {
            code,
            consoleOutput: consoleOutput.join("\n"),
        },
    } as any);

    const isLoading = status === "streaming" || status === "submitted";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput(""); // clear immediately

        await sendMessage({
            role: "user",
            content: userMessage,
        } as any);
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (!isOpen) {
        return (
            <Button
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-[9999] bg-gradient-to-tr from-primary to-secondary hover:scale-110 transition-all duration-300 border border-white/10"
                onClick={() => setIsOpen(true)}
            >
                <Bot className="w-8 h-8" />
            </Button>
        )
    }

    return (
        <div className="fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-[#18181b] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-right-10 fade-in duration-300">
            {/* Header */}
            <div className="p-4 bg-zinc-900 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">Tutor IA</h3>
                        <p className="text-xs text-zinc-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            En línea
                        </p>
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}>
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-zinc-500 mt-10 space-y-2">
                        <Bot className="w-12 h-12 mx-auto opacity-20" />
                        <p className="text-sm">¡Hola! Soy tu tutor personal.</p>
                        <p className="text-xs">Pregúntame sobre tu código o si estás atascado.</p>
                    </div>
                )}

                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex w-full",
                            m.role === "user" ? "justify-end" : "justify-start"
                        )}
                    >
                        <div
                            className={cn(
                                "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
                                m.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                    : "bg-zinc-800 text-zinc-100 rounded-tl-sm border border-white/5"
                            )}
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] opacity-50 uppercase font-bold tracking-wider mb-1">
                                    {m.role === "user" ? "Tú" : "Tutor"}
                                </span>
                                <div className="whitespace-pre-wrap leading-relaxed">
                                    {(m as any).content}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start w-full">
                        <div className="bg-zinc-800 rounded-2xl px-4 py-3 rounded-tl-sm flex gap-1 items-center">
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-zinc-900 border-t border-white/5">
                <div className="relative flex items-center">
                    <input
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-white pr-12"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Escribe tu duda aquí..."
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute right-1.5 h-8 w-8 bg-primary/20 hover:bg-primary text-primary hover:text-white transition-colors"
                        disabled={isLoading || !input.trim()}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
                <p className="text-[10px] text-center text-zinc-600 mt-2">
                    La IA puede cometer errores. Revisa el código.
                </p>
            </form>
        </div>
    );
}
