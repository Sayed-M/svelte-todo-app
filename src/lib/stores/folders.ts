import { page } from "$app/stores";
import { derived, writable } from "svelte/store";
import type { IFolder } from "../models/models";

export const folders = writable<IFolder[]>([]);

export const folderDetails =derived([folders, page], ([$folders, $page]) => {
    const folder = $folders.find(folder => folder.id === $page.params.folderId);
    let todos;
    let activeTodosCount = folder?.activeTodos.length;
    let completedTodosCount = folder?.completedTodos.length;
    if ($page.url.pathname.includes('completed')) {
        todos = folder?.completedTodos;
    } else {
        todos = folder?.activeTodos;
    }
    return {
        folder,
        todos,
        activeTodosCount,
        completedTodosCount
    }
});
