<script lang="ts">
	import { TodosTabs } from '$lib/enums/enums';
	import { activeFolder } from '$lib/stores/stores';

    export let activeTab: TodosTabs = TodosTabs.Active;

</script>

<ul class="text-gray-500 text-sm font-semibold mb-4 capitalize break-all flex items-center gap-1">
    <li>
        <a href="/{$activeFolder.folder?.id}" 
        class="bg-gray-600 text-white rounded p-2"
        class:active={activeTab === TodosTabs.Active}>Active ({$activeFolder.activeTodosCount})</a>
    </li>
    <li>
        <a href="/{$activeFolder.folder?.id}/completed" 
        class="bg-gray-600 text-white rounded p-2"
        class:active={activeTab === TodosTabs.Completed}>Completed ({$activeFolder.completedTodosCount})</a>
    </li>
</ul>

<style lang="postcss">
    .active {
        @apply bg-sky-600 cursor-default;
    }
</style>