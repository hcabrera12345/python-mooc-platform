import { PyodideInterface } from "pyodide";

let pyodideInstance: PyodideInterface | null = null;
let loadPromise: Promise<PyodideInterface> | null = null;

declare global {
    interface Window {
        loadPyodide: (config: any) => Promise<PyodideInterface>;
    }
}

export const getPyodide = async () => {
    if (pyodideInstance) return pyodideInstance;

    if (loadPromise) return loadPromise;

    loadPromise = new Promise(async (resolve, reject) => {
        // Wait for script to load if it hasn't already using a simple poll
        const checkInterval = 100;
        const maxWait = 10000;
        let waited = 0;

        const check = async () => {
            if (window.loadPyodide) {
                try {
                    const pyodide = await window.loadPyodide({
                        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.29.3/full/",
                    });
                    pyodideInstance = pyodide;
                    resolve(pyodide);
                } catch (err) {
                    reject(err);
                }
            } else if (waited > maxWait) {
                reject(new Error("Timeout waiting for Pyodide script to load"));
            } else {
                waited += checkInterval;
                setTimeout(check, checkInterval);
            }
        };
        check();
    });

    return loadPromise;
};
