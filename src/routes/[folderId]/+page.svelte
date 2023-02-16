<script lang="ts">
	import { page } from '$app/stores';
	import type { IFolder } from '$lib/models/models';
	import { folders } from '$lib/stores/folders';
	import AddTodo from '$lib/components/AddTodo.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import { TodosTabs } from '$lib/enums/enums';
	import Todos from '$lib/components/Todos.svelte';

	let folder: IFolder;

	$: folder = $folders.find(folder => folder.id === $page.params.folderId);

</script>

<svelte:head>
	<title>{folder?.name} Todos</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		<div class="flex flex-col grow min-w-[250px]">
			<h3 class="text-xl font-bold mb-4 capitalize break-all">{folder?.name}</h3>
			<Tabs folderId={folder?.id} 
				activeTodosCount={folder?.activeTodos.length} 
				completedTodosCount={folder?.completedTodos.length} 
				activeTab={TodosTabs.Active} />
			<Todos todos={folder?.activeTodos} 
			{folder} 
			activeTodosCount={folder?.activeTodos.length} 
			completedTodosCount={folder?.completedTodos.length} 
			activeTab={TodosTabs.Active} />
		</div>
		<AddTodo {folder}></AddTodo>
	</div>
</section>
