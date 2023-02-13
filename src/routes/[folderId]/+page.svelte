<script lang="ts">
	import { page } from '$app/stores';
	import type { IFolder } from '$lib/models/models';
	import { folders } from '$lib/stores/folders';
	import Todo from '$lib/components/Todo.svelte';
	import AddTodo from '$lib/components/AddTodo.svelte';

	let folder: IFolder;

	$: {
		
		folder = $folders.find(folder => folder.id === $page.params.folderId);

	}

</script>

<svelte:head>
	<title>{folder?.name} Todos</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		<div class="flex flex-col grow min-w-[250px]">
			<h3 class="text-xl font-bold mb-4 capitalize break-all">{folder?.name} Todos</h3>
			{#if folder?.todos.length}
				<div class="flex flex-wrap gap-4 mb-10">
					{#each folder?.todos as todo}
						<Todo {todo} folderId={folder?.id}></Todo>
					{/each}
				</div>
				{:else}
				<p class="text-md mt-2">No todos yet in this folder, Add some!</p>
			{/if}
		</div>
		<AddTodo></AddTodo>
	</div>
</section>
