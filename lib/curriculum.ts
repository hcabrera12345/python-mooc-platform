export type Lesson = {
    id: string;
    title: string;
    slug: string;
    type: "video" | "practice" | "quiz";
    duration: string; // e.g. "10 min"
    isCompleted?: boolean;
};

export type Week = {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
};

export const curriculum: Week[] = [
    {
        id: 1,
        title: "Semana 1: Cimientos de Python",
        description: "Variables, tipos de datos y lógica inicial.",
        lessons: [
            { id: "1-1", title: "Bienvenido al Futuro", slug: "welcome", type: "video", duration: "5 min", isCompleted: true },
            { id: "1-2", title: "Tu Primera Variable", slug: "variables", type: "practice", duration: "10 min" },
            { id: "1-3", title: "Tipos de Datos Primitivos", slug: "data-types", type: "video", duration: "8 min" },
            { id: "1-4", title: "Operadores Lógicos", slug: "operators", type: "practice", duration: "15 min" },
        ],
    },
    {
        id: 2,
        title: "Semana 2: Controlando el Flujo",
        description: "Decisiones y bucles para lógica avanzada.",
        lessons: [
            { id: "2-1", title: "Condicionales (If/Else)", slug: "intervals", type: "video", duration: "12 min" },
            { id: "2-2", title: "Bucles For y While", slug: "loops", type: "practice", duration: "20 min" },
        ],
    },
    {
        id: 3,
        title: "Semana 3: Funciones y Modularidad",
        description: "Organización profesional del código.",
        lessons: [
            { id: "3-1", title: "Definiendo Funciones", slug: "functions", type: "video", duration: "10 min" },
            { id: "3-2", title: "Scope y Retorno", slug: "scope", type: "practice", duration: "15 min" },
        ],
    },
    {
        id: 4,
        title: "Semana 4: Proyecto Final",
        description: "Creación de una aplicación real.",
        lessons: [
            { id: "4-1", title: "Gestión de Archivos", slug: "files", type: "video", duration: "15 min" },
            { id: "4-2", title: "Proyecto: Gestor de Tareas", slug: "final-project", type: "practice", duration: "45 min" },
        ],
    },
];
