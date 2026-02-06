

export async function POST(req: Request) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // Simple mock responses based on keywords
    let responseText = "🤖 **Modo Simulación**: No entiendo tu pregunta, pero sigue intentándolo.";

    if (lastMessage.content.toLowerCase().includes("hola")) {
        responseText = "¡Hola! 👋 Soy tu Tutor IA simulado. ¿En qué puedo ayudarte con tu código hoy?";
    } else if (lastMessage.content.toLowerCase().includes("error")) {
        responseText = "Parece que tienes un error. En modo simulación no puedo analizarlo a fondo, pero te sugiero revisar la sintaxis y los paréntesis.";
    } else if (lastMessage.content.toLowerCase().includes("ayuda")) {
        responseText = "¡Claro! Intenta dividir el problema en partes más pequeñas. ¿Qué es lo primero que quieres lograr?";
    } else {
        responseText = "🤖 **Respuesta Simulada**: Estás haciendo una gran pregunta. En el modo real, te analizaría el código línea por línea. Por ahora, ¡sigue así!";
    }

    // Create a simple stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            const chunks = responseText.split(" ");
            for (const chunk of chunks) {
                controller.enqueue(encoder.encode(chunk + " "));
                await new Promise((r) => setTimeout(r, 50)); // Typing effect
            }
            controller.close();
        },
    });

    return new Response(stream);
}
