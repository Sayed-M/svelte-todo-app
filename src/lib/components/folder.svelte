<script lang="ts">
    import { goto } from '$app/navigation';
    import type { IFolder } from "../models/models";
	import { page } from '$app/stores';
	import { folders } from "$lib/stores/folders";
	import { mainController } from '$lib/controllers/controllers';
    
    export let folder: IFolder;

    let deleteFolder = () => {
        if (folder.activeTodos.length) {
            let discardDeleting = confirm(`You have ${folder.activeTodos.length} active Todo(s) in this folder, Do you really want to delete?`);
            if (discardDeleting) {
                confirmDelete();
            }
        } else {
            let discardDeleting = confirm(`Do you really want to delete?`);
            if (discardDeleting) {
                confirmDelete();
            }
        }
    }

    let confirmDelete = () => {
        const controller = mainController();
        const deletedId = folder.id;
        controller.deleteFolder(deletedId);
        navigateAfterDelete(deletedId);
    }

    let navigateAfterDelete = (deletedId: string) => {
        if ($folders.length === 0) {
            goto(`/`);
            return;
        }
        if (deletedId === $page.params.folderId) {
            const firstFolderId = $folders[0].id;
            goto(`/${firstFolderId}/`);
            return;
        }
    }

</script>

<li class="flex mb-2 relative">
    <a href="/{folder.id}" 
    class="grow no-underline break-all rounded bg-slate-600 hover:bg-sky-400 text-white break-words p-2" 
    class:active={folder.id === $page.params.folderId}>{folder.name}</a>
    <button class="text-white absolute top-0 bottom-0 right-0 font-mono w-[30px] bg-slate-700 rounded-r" 
    title="Delete {folder.name}"
    on:click={deleteFolder}>X</button>
</li>

<style lang="postcss">
    .active { 
        @apply bg-sky-400;
    }
</style>