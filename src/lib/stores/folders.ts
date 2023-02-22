import { page } from "$app/stores";
import { derived, writable } from "svelte/store";
import type { IFolder } from "../models/models";

export const folders = writable<IFolder[]>([]);

export const folderDetails =derived([folders, page], ([$folders, $page]) => {
    const folder = $folders.find(folder => folder.id === $page.params.folderId);
    let todos;
    let activeTodosCount;
    let completedTodosCount;
    if ($page.url.pathname.includes('completed')) {
        todos = folder?.completedTodos;
        completedTodosCount = folder?.completedTodos.length;
    } else {
        todos = folder?.activeTodos;
        activeTodosCount = folder?.activeTodos.length;
    }
    return {
        folder,
        todos,
        activeTodosCount,
        completedTodosCount
    }
});
