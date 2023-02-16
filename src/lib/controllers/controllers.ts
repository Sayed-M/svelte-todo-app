import type { IFolder, ITodo } from "$lib/models/models"
import { folders } from "$lib/stores/folders"

export const mainController = () => {
    return {

        createFolder(folder: IFolder) {
            folders.update(currentFolders => {
                return currentFolders = [...currentFolders, folder];
            });
        },
        deleteFolder(id: string) {
            folders.update(currentFolders => {
                return currentFolders = currentFolders.filter(folder => folder.id !== id);
            });
        },
        addTodo(folderId: string, todo: ITodo) {
            folders.update(currentFolders => {
                const folder = currentFolders.find(folder => folder.id === folderId);
                folder.activeTodos = [...folder.activeTodos, todo];
                return currentFolders;
            });
        },
        completeTodo(folderId: string, todoId: string) {
            folders.update(currentFolders => {
                const folder = currentFolders.find(folder => folder.id === folderId);
                const todo = folder?.activeTodos.find(todo => todo.id === todoId);

                const updatedTodos = folder?.activeTodos.filter(todo => todo.id !== todoId);
                folder.activeTodos = updatedTodos;

                todo.isCompleted = true;
                folder.completedTodos = [...folder.completedTodos, todo];
                return currentFolders;
            });
        },
        updateTodo(folderId: string, todoId: string, newTodo: ITodo) {
            folders.update(currentFolders => {
                const folder = currentFolders.find(folder => folder.id === folderId);
                const todoIndex = folder?.activeTodos.findIndex(td => td.id === todoId)
                folder.activeTodos[todoIndex] = newTodo;
                return currentFolders;
            });
        }
    }
}