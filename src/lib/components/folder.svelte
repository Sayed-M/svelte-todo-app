<script lang="ts">
    import type { IFolder } from "../models/models";
	import { page } from '$app/stores';
    
    export let folder: IFolder;

</script>

<li><a href="/{folder.id}" class="text-black break-words" class:active={folder.id === $page.params.id}>{folder.name}</a></li>

<style lang="postcss">
    .active { 
        @apply text-primary;
    }
</style>