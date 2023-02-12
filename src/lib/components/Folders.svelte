<script lang="ts">
	import type { IFolder } from '$lib/models/models';
	import Folder from "$lib/components/Folder.svelte";
	import { folders } from "$lib/stores/folders";
	import { v4 as uuidv4 } from 'uuid';

    let folderName = '';

    let addFolder = () => {
        if (folderName) {
            let newFolder: IFolder = {
                id: uuidv4(),
                name: folderName
            }
            folders.update(currentFolders => {
                return [newFolder, ...currentFolders];
            })
        }
        folderName = '';
    }
</script>

<form on:submit|preventDefault={addFolder}>
    <input type="text" placeholder="Type here" bind:value={folderName} class="input w-full max-w-xs" />
</form>
<ul class="bg-base-100 mt-4">
    {#each $folders as folder}
        <Folder {folder}></Folder>
    {/each}
</ul>