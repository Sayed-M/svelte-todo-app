import type { IFolder } from "$lib/models/models"
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
        }
    }
}