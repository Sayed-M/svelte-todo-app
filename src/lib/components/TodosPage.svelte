<script lang="ts">
	import type { IFolder } from '$lib/models/models';
	import AddTodo from '$lib/components/AddTodo.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import { TodosTabs } from '$lib/enums/enums';
	import Todos from '$lib/components/Todos.svelte';

	export let folder: IFolder;
    export let activeTab: TodosTabs;

</script>

<svelte:head>
	<title>{folder?.name} Todos</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		<div class="flex flex-col grow min-w-[250px]">
			<h3 class="text-xl font-bold mb-4 capitalize break-all">{folder?.name}</h3>
			<Tabs folderId={folder?.id} 
                {activeTab} 
				activeTodosCount={folder?.activeTodos.length} 
				completedTodosCount={folder?.completedTodos.length}  />
			<Todos {activeTab} />
		</div>
		{#if activeTab === TodosTabs.Active}
            <AddTodo {folder}></AddTodo>
        {/if}
	</div>
</section>
