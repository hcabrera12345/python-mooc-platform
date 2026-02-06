export type LessonType = "video" | "practice" | "quiz";

export type Lesson = {
    id: string;
    title: string;
    slug: string;
    type: LessonType;
    duration: string;
    isCompleted?: boolean;
    content: string; // Markdown content
    initialCode?: string; // Starter code for the editor
    validationCode?: string; // Hidden code to validate the student's solution
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
        title: "Semana 1: Fundamentos Absolutos",
        description: "Dominio total de la sintaxis, memoria y algoritmos secuenciales.",
        lessons: [
            // --- MODULO 1: FUNDAMENTOS Y CONTEXTO ---
            {
                id: "1-1",
                title: "¿Qué es Python?",
                slug: "what-is-python",
                type: "video",
                duration: "10 min",
                isCompleted: true,
                content: `
# 1.1 El Ecosistema Python

Bienvenido a la herramienta más poderosa del siglo XXI. Python no es solo un lenguaje; es la navaja suiza de la tecnología.

## ¿Por qué Python domina el mundo?
1.  **IA y Machine Learning**: Bibliotecas como PyTorch y TensorFlow son nativas de Python.
2.  **Desarrollo Web**: Instagram, Spotify y Pinterest usan Python (Django/Flask) en su backend.
3.  **Ciencia de Datos**: Análisis financiero, bioinformática y estadística.
4.  **Automatización**: Scripts que ahorran miles de horas humanas.

### Filosofía: The Zen of Python
Escribe \`import this\` en tu consola alguna vez. Verás principios como:
> "Beautiful is better than ugly."
> "Simple is better than complex."

Esta filosofía hace que el código Python sea mantenible y limpio por defecto.
        `
            },
            {
                id: "1-2",
                title: "Instalación Profesional",
                slug: "installation",
                type: "practice",
                duration: "15 min",
                content: `
# 1.2 Configurando tu Taller Digital

Un programador es tan bueno como sus herramientas. Vamos a configurar un entorno profesional.

### Paso 1: El Intérprete
Descarga Python desde [python.org](https://python.org). Asegúrate de marcar **"Add Python to PATH"** en Windows. Esto permite invocar a Python desde cualquier ventana de comandos.

### Paso 2: El Editor (IDE)
Recomendamos **VS Code**. Instálalo y añade la extensión oficial de Microsoft para Python. Esto te dará:
- Autocompletado (IntelliSense)
- Detección de errores en tiempo real (Linting)
- Ejecución con un clic

### Verificación
Vamos a simular que verificas tu entorno. Ejecuta el código para confirmar que el "sistema" reporta la versión correcta.
        `,
                initialCode: `import sys

# Muestra la versión actual de Python
print(f"Versión detectada: {sys.version}")
print("Sistema listo para despegue.")`,
                validationCode: `print("SUCCESS: Entorno verificado (Simulado).")`
            },
            {
                id: "1-3",
                title: "Hola Mundo y Comentarios",
                slug: "hello-world",
                type: "practice",
                duration: "10 min",
                content: `
# 1.3 Tu Primer Script

Todo viaje comienza con un paso. En programación, ese paso es imprimir algo en pantalla.

## La función \`print()\`
Envía texto a la salida estándar (consola).
\`\`\`python
print("Texto")
print(42)
\`\`\`

## Comentarios (\`#\`)
El código es para las máquinas, pero los comentarios son para los humanos. Todo lo que sigue a un \`#\` es ignorado por Python. Úsalos para explicar el *por qué*, no el *qué*.

### Desafío
1. Imprime una línea que diga "Iniciando sistema...".
2. Añade un comentario explicando la línea.
3. Imprime "Sistema activo".
        `,
                initialCode: `# Tu código aquí
`,
                validationCode: `
# Simple check logic driven by output success implies code ran
print("SUCCESS: Script ejecutado.")
        `
            },
            {
                id: "1-4",
                title: "Entendiendo Errores",
                slug: "errors-debugging",
                type: "video",
                duration: "10 min",
                content: `
# 1.4 No temas a los Errores

Los mensajes de error (Tracebacks) son tus mejores amigos. No te dicen "eres malo", te dicen "aquí es donde me perdí".

### Anatomía de un Error
\`\`\`text
File "main.py", line 1
    print("Hola"
          ^
SyntaxError: '(' was never closed
\`\`\`
1.  **Archivo y Línea**: Dónde ocurrió. 
2.  **El Código**: Muestra la línea culpable.
3.  **Tipo de Error**: \`SyntaxError\`, \`NameError\`, \`TypeError\`.
4.  **Descripción**: Qué pasó (falta un paréntesis).

Aprender a leer esto es el 50% de programar.
        `
            },

            // --- MODULO 2: DATOS Y MEMORIA ---
            {
                id: "1-5",
                title: "Variables y Memoria",
                slug: "variables-advanced",
                type: "practice",
                duration: "20 min",
                content: `
# 1.5 Variables: El ADN del Programa

Las variables no son cajas; son etiquetas que pegas a objetos en la memoria.

\`\`\`python
a = [1, 2, 3]
b = a
\`\`\`
Aquí, \`a\` y \`b\` apuntan a la *misma* lista. Si cambias la lista a través de \`a\`, \`b\` también verá el cambio. No copiaremos objetos complejos aun, pero entiende que \`=\` asigna REFERENCIAS.

## Nombramiento (Clean Code)
- Usa \`snake_case\` para variables: \`mi_variable_importante\`.
- Sé descriptivo: \`d\` vs \`dias_transcurridos\`.
- Evita palabras reservadas (\`class\`, \`def\`, \`import\`).

### Desafío
Refactoriza el código sucio para que use nombres descriptivos y correctos.
        `,
                initialCode: `# CÓDIGO SUCIO
n = "Juan"
p = 25
E = "juan@email.com"

print(f"Usuario {n}, edad {p}, correo {E}")`,
                validationCode: `
try:
    if 'nombre' in locals(): n_val = nombre
    elif 'nombre_usuario' in locals(): n_val = nombre_usuario
    else: raise NameError("Usa un nombre descriptivo para 'n' (ej: nombre, nombre_usuario)")

    if 'edad' not in locals(): raise NameError("Usa 'edad' para 'p'")
    if 'email' in locals(): pass
    elif 'correo' in locals(): pass
    else: raise NameError("Usa 'email' o 'correo' para 'E'")
    
    print("SUCCESS: Código refactorizado y limpio.")
except NameError as e:
    print(f"FAIL: {e}")
except Exception as e:
    print(f"ERROR: {e}")
        `
            },
            {
                id: "1-6",
                title: "Tipos Primitivos",
                slug: "primitives",
                type: "practice",
                duration: "15 min",
                content: `
# 1.6 Los Átomos de Python

Todo en Python es un objeto, pero hay 4 bloques fundamentales:

1.  **Integers (\`int\`)**: Precisión arbitraria (pueden ser gigantemente grandes).
2.  **Floats (\`float\`)**: Precisión doble (hay límites de decimales, error de punto flotante).
3.  **Strings (\`str\`)**: Cadenas inmutables de caracteres Unicode (sí, soportan emojis 🐍).
4.  **Booleans (\`bool\`)**: Subtipo de enteros (\`True\` es 1, \`False\` es 0).

### Desafío
Crea una variable de cada tipo que represente los datos de un planeta.
        `,
                initialCode: `# Define:
# planeta (str)
# diametro_km (int)
# gravedad (float)
# es_habitable (bool)

# Tu código aquí:
`,
                validationCode: `
try:
    assert isinstance(planeta, str), "planeta debe ser str"
    assert isinstance(diametro_km, int), "diametro_km debe ser int"
    assert isinstance(gravedad, float), "gravedad debe ser float"
    assert isinstance(es_habitable, bool), "es_habitable debe ser bool"
    print("SUCCESS: Sistema planetario registrado.")
except NameError as e:
    print(f"FAIL: Variable no encontrada: {e}")
except AssertionError as e:
    print(f"FAIL: {e}")
        `
            },
            {
                id: "1-7",
                title: "Strings Avanzados",
                slug: "strings-advanced",
                type: "practice",
                duration: "20 min",
                content: `
# 1.7 Manipulación de Texto

Los strings son secuencias. Puedes acceder a sus partes.

## Indexing
\`\`\`python
texto = "Python"
print(texto[0])  # 'P'
print(texto[-1]) # 'n' (último)
\`\`\`

## Slicing (Rebanadas)
\`\`\`python
print(texto[0:3]) # "Pyt" (desde 0 hasta 2, el 3 se excluye)
\`\`\`

## Métodos útiles
- \`.upper()\`: MAYÚSCULAS
- \`.lower()\`: minúsculas
- \`.replace("a", "b")\`: Reemplazar
- \`.strip()\`: Quitar espacios extra

### Desafío
Limpia y formatea el nombre de archivo sucio.
        `,
                initialCode: `archivo_sucio = "  reporte_FINAL.txt  "

# 1. Quita espacios (strip)
# 2. Convierte a minúsculas (lower)
# 3. Reemplaza "reporte" por "data"

nombre_limpio = ...
print(nombre_limpio)`,
                validationCode: `
try:
    esperado = "data_final.txt"
    assert nombre_limpio == esperado, f"Se esperaba '{esperado}', se obtuvo '{nombre_limpio}'"
    print("SUCCESS: Procesamiento de texto completado.")
except NameError:
    print("FAIL: Define la variable 'nombre_limpio'")
except AssertionError as e:
    print(f"FAIL: {e}")
        `
            },
            {
                id: "1-8",
                title: "Entrada y Conversión",
                slug: "input-casting",
                type: "practice",
                duration: "15 min",
                content: `
# 1.8 Interactividad y Casting

\`input()\` devuelve string. Siempre. Si quieres matemáticas, debes convertir (castear).

\`\`\`python
edad = int(input("Edad: "))
precio = float(input("Precio: "))
\`\`\`

### Desafío
Calculadora de edad canina (1 año humano = 7 perros). 
Pide la edad humana, conviértela y muestra la edad perro.
*Nota: En este editor simulamos el input asignando variables directamente, pero imagina que vienen del usuario.*
        `,
                initialCode: `edad_humana_str = "10" # Simula input("Edad: ")

# Convierte a entero
edad_humana = ...

# Calcula edad perro
edad_perro = ...

print(f"Tu perro tiene {edad_perro} años perro.")`,
                validationCode: `
try:
    assert isinstance(edad_humana, int), "edad_humana debe ser int"
    assert edad_perro == 70, "10 años humanos son 70 de perro"
    print("SUCCESS: Conversión correcta.")
except Exception as e:
    print(f"FAIL: {e}")
        `
            },

            // --- MODULO 3: LÓGICA MATEMÁTICA ---
            {
                id: "1-9",
                title: "Operadores Aritméticos",
                slug: "operators-math",
                type: "practice",
                duration: "15 min",
                content: `
# 1.9 Matemáticas en Python

Más allá de \`+\`, \`-\`, \`*\`, \`/\`:

1.  **División Entera (\`//\`)**: \`5 // 2\` es \`2\`. Descarta el \`.5\`.
2.  **Módulo (\`%\`)**: El resto. \`5 % 2\` es \`1\`. Fundamental para detectar pares/impares o ciclos.
3.  **Potencia (\`**\`)**: \`3 ** 2\` es \`9\`.

### Desafío
Tienes 100 segundos. Conviértelo a minutos y segundos restantes usando operadores.
        `,
                initialCode: `total_segundos = 100

minutos = ... # Usa división entera
segundos_restantes = ... # Usa módulo

print(f"{total_segundos}s son {minutos}m y {segundos_restantes}s")`,
                validationCode: `
try:
    assert minutos == 1, "100 // 60 es 1"
    assert segundos_restantes == 40, "100 % 60 es 40"
    print("SUCCESS: Algoritmo de tiempo correcto.")
except Exception as e:
    print(f"FAIL: {e}")
        `
            },
            {
                id: "1-10",
                title: "Operadores de Comparación",
                slug: "comparison",
                type: "practice",
                duration: "15 min",
                content: `
# 1.10 Comparando el Mundo

La base de la toma de decisiones. Estos operadores siempre devuelven un \`bool\` (\`True\` o \`False\`).

*   \`==\` (Igualdad): ¿Es A igual a B?
*   \`!=\` (Desigualdad): ¿Es A diferente de B?
*   \`>\`, \`<\`, \`>=\`, \`<=\`: Mayor/Menor que.

### Desafío
Verifica si el usuario es mayor de edad (18+).
        `,
                initialCode: `edad_usuario = 17
mayor_edad = 18

es_mayor = edad_usuario ... mayor_edad # Completa

print(f"¿Es mayor?: {es_mayor}")`,
                validationCode: `
try:
    assert es_mayor == False, "17 no es >= 18"
    assert isinstance(es_mayor, bool), "El resultado debe ser booleano"
    print("SUCCESS: Comparación lógica correcta.")
except Exception as e:
    print(f"FAIL: {e}")
        `
            },
            {
                id: "1-11",
                title: "Lógica Booleana",
                slug: "boolean-logic",
                type: "practice",
                duration: "20 min",
                content: `
# 1.11 AND, OR, NOT

Combinamos comparaciones para lógica compleja.

1.  **\`and\`**: Verdadero solo si AMBOS son verdaderos.
2.  **\`or\`**: Verdadero si AL MENOS UNO es verdadero.
3.  **\`not\`**: Invierte el valor.

### Tabla de Verdad
*   \`True and False\` -> \`False\`
*   \`True or False\` -> \`True\`
*   \`not True\` -> \`False\`

### Desafío: Sistema de Acceso
Para entrar, necesitas: (Tener entrada O ser VIP) Y (Ser mayor de edad).
        `,
                initialCode: `tiene_entrada = False
es_vip = True
edad = 20

puede_pasar = ...

print(f"¿Entra?: {puede_pasar}")`,
                validationCode: `
try:
    # (False or True) and (20 >= 18) -> True and True -> True
    assert puede_pasar == True, "Debería poder pasar (es VIP y mayor de edad)"
    print("SUCCESS: Lógica de portero de discoteca validada.")
except Exception as e:
    print(f"FAIL: {e}")
        `
            },

            // --- MODULO 4: ALGORITMOS Y PROYECTOS ---
            {
                id: "1-12",
                title: "Algoritmo: Converter de Unidades",
                slug: "unit-converter",
                type: "practice",
                duration: "25 min",
                content: `
# 1.12 Proyecto: Convertidor Universal

Vamos a crear una herramienta científica. Convertiremos grados Celsius a Fahrenheit.

Fórmula: \`(Celsius * 9/5) + 32\`

Este ejercicio combina variables, floats, operadores matemáticos y f-strings.
        `,
                initialCode: `celsius = 25.0

# 1. Aplica la fórmula
fahrenheit = ...

# 2. Imprime: "25.0°C son 77.0°F"
mensaje = ...
print(mensaje)`,
                validationCode: `
try:
    f_check = (25.0 * 9/5) + 32
    assert fahrenheit == f_check, f"Cálculo erróneo. Esperado {f_check}"
    assert "25.0°C son 77.0°F" in mensaje, "El formato del mensaje no es exacto."
    print("SUCCESS: Convertidor funcionando.")
except Exception as e:
    print(f"FAIL: {e}")
        `
            },
            {
                id: "1-13",
                title: "Algoritmo: Calculadora de Propinas",
                slug: "tip-calculator",
                type: "practice",
                duration: "25 min",
                content: `
# 1.13 Proyecto: Split the Bill

Vas a cenar con amigos. Llega la cuenta. Hay que calcular cuánto paga cada uno incluyendo propina.

**Datos:**
- Total cuenta: 150
- Propina sugerida: 15% (0.15)
- Personas: 4

**Objetivo:**
Calcular el total con propina y dividir por personas.
        `,
                initialCode: `cuenta = 150
propina_pct = 0.15
personas = 4

# Calcula monto propina
monto_propina = ...

# Calcula total final
total_pagar = ...

# Calcula por persona
pago_individual = ...

print(f"Cada uno paga: \${pago_individual}")`,
                validationCode: `
try:
    assert monto_propina == 22.5, "15% de 150 es 22.5"
    assert total_pagar == 172.5, "150 + 22.5 es 172.5"
    assert pago_individual == 43.125, "172.5 / 4 es 43.125"
    print("SUCCESS: Algoritmo financiero validado.")
except Exception as e:
    print(f"FAIL: {e}")
        `
            },
            {
                id: "1-14",
                title: "Algoritmo: Generador de Historias",
                slug: "story-generator",
                type: "practice",
                duration: "20 min",
                content: `
# 1.14 Proyecto: Mad Libs

La generación de texto es la base de las IAs modernas. Vamos a hacer una versión primitiva.

Crea variables para: sustantivo, lugar y verbo.
Inyectalas en un string de plantilla.
        `,
                initialCode: `protagonista = "El Gato Cuántico"
lugar = "Marte"
accion = "bailó salsa"

# Crea la historia: "[protagonista] fue a [lugar] y [accion]."
historia = ...

print(historia)`,
                validationCode: `
try:
    expected = "El Gato Cuántico fue a Marte y bailó salsa."
    assert historia == expected, f"Historia incorrecta. \\nEsperado: {expected}\\nObtenido: {historia}"
    print("SUCCESS: Motor narrativo operativo.")
except Exception as e:
    print(f"FAIL: {e}")
        `
            },
            {
                id: "1-15",
                title: "Proyecto Final: Calculadora IMC",
                slug: "project-imc",
                type: "practice",
                duration: "40 min",
                content: `
# 1.15 Proyecto Final: Calculadora de Salud

El Índice de Masa Corporal (IMC) es un estándar médico.
Ahora que dominas variables, tipos y operadores, construye la calculadora definitiva.

**Fórmula**: \`peso_kg / (altura_m ** 2)\`
        `,
                initialCode: `# Datos del paciente
peso = 85
altura = 1.80

# 1. Calcula IMC
imc = ...

# 2. Genera reporte: "Paciente (85kg, 1.80m) tiene IMC de: X"
reporte = ...

print(reporte)`,
                validationCode: `
try:
    check = 85 / (1.80 ** 2)
    assert abs(imc - check) < 0.01, f"Cálculo matemático incorrecto."
    assert "26.2" in reporte or str(round(check, 1)) in reporte or str(round(check, 2)) in reporte, "El reporte debe incluir el número del IMC"
    print("SUCCESS: PROYECTO SEMANA 1 COMPLETADO. ¡FELICIDADES!")
except Exception as e:
    print(f"FAIL: {e}")
        `
            },
        ],
    },
    // Placeholders for future weeks
    {
        id: 2,
        title: "Semana 2: Controlando el Flujo",
        description: "Decisiones y bucles.",
        lessons: [{ id: "2-1", title: "Condicionales", slug: "conditionals", type: "practice", duration: "15 min", content: "# Próximamente", initialCode: "pass" }]
    },
    {
        id: 3,
        title: "Semana 3: Funciones",
        description: "Modularidad.",
        lessons: [{ id: "3-1", title: "Funciones", slug: "functions", type: "practice", duration: "15 min", content: "# Próximamente", initialCode: "pass" }]
    },
    {
        id: 4,
        title: "Semana 4: Proyecto Final",
        description: "Aplicación Real.",
        lessons: [{ id: "4-1", title: "Gestión de Tareas", slug: "project", type: "practice", duration: "60 min", content: "# Próximamente", initialCode: "pass" }]
    }
];
