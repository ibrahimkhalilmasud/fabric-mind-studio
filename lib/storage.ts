import type { StudioProject } from "@/types";

const DB_NAME = "fabric-mind-studio";
const STORE_NAME = "projects";
const VERSION = 1;

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveProject(project: StudioProject): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(project);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    const current = JSON.parse(localStorage.getItem("fabric-mind-projects") ?? "[]") as StudioProject[];
    const filtered = current.filter((item) => item.id !== project.id);
    localStorage.setItem("fabric-mind-projects", JSON.stringify([project, ...filtered].slice(0, 20)));
  }
}

export async function listProjects(): Promise<StudioProject[]> {
  if (typeof window === "undefined") return [];
  try {
    const db = await openDatabase();
    return await new Promise<StudioProject[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).getAll();
      request.onsuccess = () => resolve((request.result as StudioProject[]).sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
      request.onerror = () => reject(request.error);
    });
  } catch {
    return JSON.parse(localStorage.getItem("fabric-mind-projects") ?? "[]") as StudioProject[];
  }
}
