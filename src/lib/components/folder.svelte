<script lang="ts">
    import { goto } from '$app/navigation';
    import type { IFolder } from "../models/models";
	import { page } from '$app/stores';
	import { folders } from "$lib/stores/folders";
    
    export let folder: IFolder;

    let deleteFolder = () => {
        if (folder.todos.length) {
            let discardDeleting = confirm(`You have ${folder.todos.length} Todo(s) in this folder, Do you really want to delete?`);
            if (discardDeleting) {
                confirmDelete();
            }
        } else {
            let discardDeleting = confirm(`Do you really want to delete?`);
            if (discardDeleting) {
                confirmDelete();
            }
        }
        if ($folders.length === 0) {
            goto(`/`);
            return;
        }
        if (folder.id === $page.params.folderId) {
            const firstFolder = $folders[0].id;
            goto(`/${firstFolder}/`);
            return;
        }
    }

    let confirmDelete = () => {
        let updatedFolders = $folders.filter(fd => fd.id !== folder.id)
        $folders = updatedFolders;
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