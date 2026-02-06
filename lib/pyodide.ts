import { loadPyodide, PyodideInterface } from "pyodide";

let pyodideInstance: PyodideInterface | null = null;

export const getPyodide = async () => {
    if (!pyodideInstance) {
        pyodideInstance = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
        });
    }
    return pyodideInstance;
};
