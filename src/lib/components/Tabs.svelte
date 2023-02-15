<script lang="ts">
	import { TodosTabs } from '$lib/enums/enums';

    export let folderId: string;
    export let activeTodosCount: number;
    export let completedTodosCount: number;

    export let activeTab: TodosTabs = TodosTabs.Active;

</script>

<ul class="text-gray-500 text-sm font-semibold mb-4 capitalize break-all flex items-center gap-1">
    <li>
        <a href="/{folderId}" 
        class="bg-gray-600 text-white rounded p-2"
        class:active={activeTab === TodosTabs.Active}>Active ({activeTodosCount})</a>
    </li>
    <li>
        <a href="/{folderId}/completed" 
        class="bg-gray-600 text-white rounded p-2"
        class:active={activeTab === TodosTabs.Completed}>Completed ({completedTodosCount})</a>
    </li>
</ul>

<style lang="postcss">
    .active {
        @apply bg-sky-600 cursor-default;
    }
</style>