import { page } from "$app/stores";
import { derived, writable } from "svelte/store";
import type { IFolder, ITodo } from "../models/models";

function foldersStore() {
	const { subscribe, set, update } = writable<IFolder[]>([]);
    return {
		subscribe,
		set,
		update,
        createFolder: (folder: IFolder) => {
            update((currentFolders) => {
                currentFolders.push(folder);
                return currentFolders;
            })
        },
        deleteFolder: (id: string) => {
            update((currentFolders) => {
                return currentFolders.filter(folder => folder.id !== id)
            })
        },
        addTodo: (folderId: string, todo: ITodo) => {
            update((currentFolders) => {
                const folder = currentFolders.find(folder => folder.id === folderId)
                folder?.activeTodos.push(todo)
                return currentFolders;
            })
        },
        completeTodo: (folderId: string, todoId: string) => {
            update((currentFolders) => {
                const folder = currentFolders.find(folder => folder.id === folderId)
                const todo = folder?.activeTodos.find(todo => todo.id === todoId)
                const updatedTodos = folder?.activeTodos.filter(todo => todo.id !== todoId)
                folder.activeTodos = updatedTodos
                todo.isCompleted = true
                folder.completedTodos = [...folder.completedTodos, todo]
                return currentFolders;
            })
        },
        updateTodo: (folderId: string, todoId: string, newTodo: ITodo) => {
            update((currentFolders) => {
                const folder = currentFolders.find(folder => folder.id === folderId)
                const todoIndex = folder?.activeTodos.findIndex(td => td.id === todoId)
                folder.activeTodos[todoIndex] = newTodo
                return currentFolders
            })
        }
    }
}

export const folders = foldersStore();

export const activeFolder = derived([folders, page], ([$folders, $page]) => {
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

export const activeTodo = derived([activeFolder, page], ([$activeFolder, $page]) => {
    const todo = $activeFolder.todos?.find(todo => todo.id === $page.params.todoId);
    return todo;
});
