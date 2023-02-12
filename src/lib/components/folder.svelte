<script lang="ts">
    import type { IFolder } from "../models/models";
	import { page } from '$app/stores';
    
    export let folder: IFolder;

</script>

<li class="flex"><a href="/folders/{folder.id}" class="grow no-underline rounded bg-slate-600 hover:bg-sky-400 text-white break-words mt-2 p-2" class:active={folder.id === $page.params.folderId}>{folder.name}</a></li>

<style lang="postcss">
    .active { 
        @apply bg-sky-400;
    }
</style>