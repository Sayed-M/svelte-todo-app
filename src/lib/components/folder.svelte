<script lang="ts">
    import type { IFolder } from "../models/models";
	import { page } from '$app/stores';
    
    export let folder: IFolder;

</script>

<li class="flex"><a href="/{folder.id}" class="grow no-underline rounded bg-yellow-500 hover-bg-yellow-600 text-white break-words mt-2 p-2" class:active={folder.id === $page.params.id}>{folder.name}</a></li>

<style lang="postcss">
    .active { 
        @apply bg-yellow-700;
    }
</style>