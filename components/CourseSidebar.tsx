import Link from "next/link";
import { curriculum } from "@/lib/curriculum"; // Assuming absolute path alias isn't set up for lib yet? checking tsconfig. 
// Wait, I used @/lib in utils.ts and it worked? Let's assume @/ works.
import { cn } from "@/lib/utils";
import { CheckCircle2, Circle, PlayCircle, Lock } from "lucide-react";

export default function CourseSidebar({ currentSlug }: { currentSlug: string }) {
    return (
        <div className="w-full md:w-80 h-full bg-zinc-950 border-r border-white/5 flex flex-col overflow-y-auto">
            <div className="p-6 border-b border-white/5">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Python MOOC
                </h2>
                <div className="mt-4 flex gap-2 text-xs text-zinc-500 font-mono">
                    <span>PROGRESO TOTAL</span>
                    <span className="text-white">15%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-secondary w-[15%]" />
                </div>
            </div>

            <div className="flex-1 p-4 space-y-6">
                {curriculum.map((week) => (
                    <div key={week.id} className="space-y-3">
                        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider pl-2">
                            {week.title}
                        </h3>
                        <div className="space-y-1">
                            {week.lessons.map((lesson) => {
                                const isActive = lesson.slug === currentSlug;
                                return (
                                    <Link
                                        key={lesson.id}
                                        href={`/course/${lesson.slug}`}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all group",
                                            isActive
                                                ? "bg-primary/10 text-primary border border-primary/20"
                                                : "text-zinc-400 hover:text-white hover:bg-white/5"
                                        )}
                                    >
                                        {lesson.isCompleted ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                                        ) : isActive ? (
                                            <PlayCircle className="w-4 h-4 text-primary animate-pulse" />
                                        ) : (
                                            <Circle className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
                                        )}
                                        <span className="line-clamp-1">{lesson.title}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
