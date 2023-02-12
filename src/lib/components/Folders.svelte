<script lang="ts">
    import { goto } from '$app/navigation';
	import type { IFolder } from '$lib/models/models';
	import Folder from "$lib/components/Folder.svelte";
	import { folders } from "$lib/stores/folders";
	import { v4 as uuidv4 } from 'uuid';

    let folderName: string = '';
    let isCreateDisabled: boolean = true;

    $: {
        folderName ? isCreateDisabled = false : true;
    }

    let createFolder = () => {
        if (folderName) {
            let newFolder: IFolder = {
                id: uuidv4(),
                name: folderName,
                todos: []
            }
            folders.update(currentFolders => {
                return [newFolder, ...currentFolders];
            });

            if ($folders.length === 1) {
                goto(`/folders/${$folders[0].id}`, { replaceState: true });
            }

            folderName = '';
            isCreateDisabled = true;
        }
    }
</script>

<section class="flex flex-col gap-2 px-2">
    {#if $folders.length}
        <h3 class="text-slate-400 font-bold">Folders</h3>
        <ul>
            {#each $folders as folder}
                <Folder {folder}></Folder>
            {/each}
        </ul>
        {:else}
        <div>
            <p class="text-white">Create a folder</p>
        </div>
    {/if}
    <form on:submit|preventDefault={() => createFolder()}>
        <div class="form-control">
            <div class="input-group">
                <input type="text" placeholder="Folder name..." bind:value={folderName} class="input w-full max-w-xs p-1 text-sm" />
                <button class="btn btn-accent bg-sky-500 hover:bg-sky-600 text-white disabled:bg-slate-300" disabled={isCreateDisabled}>Create</button>
            </div>
        </div>
    </form>
</section>