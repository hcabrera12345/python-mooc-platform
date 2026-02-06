import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

// Provider initialized lazily inside handler to prevent build-time/module-load crashes
// const google = createGoogleGenerativeAI({ ... });

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, code, consoleOutput } = await req.json();

  const systemContext_v1 = `
    You are an expert Python Tutor for a MOOC called "Python para el Futuro Digital".
    Your goal is to help students learn by doing, using the Socratic method.
    
    RULES:
    1. NEVER give the direct solution or write the full corrected code unless explicitly asked 3 times or if the user is completely stuck after hints.
    2. Analyze the student's code provided in the CONTEXT.
    3. If there is an error in 'consoleOutput', explain WHY it happened (the logic/syntax cause), don't just say "fix line X".
    4. Be encouraging, concise, and professional but friendly.
    5. Reply in Spanish (Español).
    
    CONTEXT:
    Student's Current Code:
    \`\`\`python
    ${code}
    \`\`\`
    
    Console Output / Error:
    \`\`\`text
    ${consoleOutput}
    \`\`\`
  `;

  // MOCK FALLBACK: If no keys are detected so connection fails gracefully on frontend
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    const mockStream = new ReadableStream({
      start(controller) {
        const text = "🤖 **Modo Simulación**: No he detectado una API Key configurada.\\n\\nPara activar mi inteligencia real:\\n1. Crea un archivo `.env.local`\\n2. Añade `GEMINI_API_KEY=tu_clave`\\n\\n¡Avísame cuando estés listo!";
        controller.enqueue(text);
        controller.close();
      }
    });
    return new Response(mockStream);
  }

  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: systemContext_v1,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Return a text stream with the error so the UI shows it instead of crashing
    const errorStream = new ReadableStream({
      start(controller) {
        controller.enqueue(`⚠️ **Error de Conexión**: ${error.message}`);
        controller.close();
      }
    });
    return new Response(errorStream);
  }
}
