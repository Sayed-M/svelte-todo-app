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
    }
}