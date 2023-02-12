<script lang="ts">
	import type { IFolder } from '$lib/models/models';
	import Folder from "$lib/components/Folder.svelte";
	import { folders } from "$lib/stores/folders";
	import { v4 as uuidv4 } from 'uuid';

    let folderName = '';
    let isAddDisabled = true;

    $: {
        folderName ? isAddDisabled = false : true
    }

    let addFolder = () => {
        if (folderName) {
            let newFolder: IFolder = {
                id: uuidv4(),
                name: folderName,
                todos: []
            }
            folders.update(currentFolders => {
                return [newFolder, ...currentFolders];
            })
        }
        folderName = '';
        isAddDisabled = true
    }
</script>

<section class="flex flex-col gap-2 p-2">
    {#if $folders.length}
        <ul class="pt-4">
            {#each $folders as folder}
                <Folder {folder}></Folder>
            {/each}
        </ul>
        {:else}
        <div class="p-1 rounded">
            <p class="text-white">No folders yet!</p>
        </div>
    {/if}
    <form on:submit|preventDefault={addFolder}>
        <div class="form-control">
            <div class="input-group">
                <input type="text" placeholder="Folder name..." bind:value={folderName} class="input w-full max-w-xs p-1 text-sm" />
                <button class="btn btn-accent text-white disabled:bg-white" disabled={isAddDisabled}>Add</button>
            </div>
        </div>
    </form>
</section>