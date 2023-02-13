<script lang="ts">
	import { page } from '$app/stores';
	import type { IFolder } from '$lib/models/models';
	import { folders } from '$lib/stores/folders';
	import Todo from '$lib/components/Todo.svelte';
	import AddTodo from '$lib/components/AddTodo.svelte';

	let folder: IFolder;
	let completedTodosCount: number = 5;

	$: {
		
		folder = $folders.find(folder => folder.id === $page.params.folderId);

		completedTodosCount = folder?.todos.filter(todo => todo.isCompleted).length;

	}

</script>

<svelte:head>
	<title>{folder?.name} Todos</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		<div class="flex flex-col grow min-w-[250px]">
			<h3 class="text-xl font-bold mb-4 capitalize break-all">{folder?.name}</h3>
			<h3 class="text-gray-500 text-sm font-semibold mb-4 capitalize break-all">{folder?.todos.length} Todos - {completedTodosCount} Completed.</h3>
			{#if !folder?.todos.length}
				<p class="text-md mt-2">No todos yet in this folder, Add some!</p>
			{/if}
			{#if folder?.todos.length && folder?.todos.length !== completedTodosCount}
				<div class="flex flex-wrap gap-4 mb-10">
					{#each folder?.todos as todo}
						{#if !todo.isCompleted}
							<Todo {todo} folderId={folder?.id}></Todo>
						{/if}
					{/each}
				</div>
			{/if}
			{#if  folder?.todos.length && folder?.todos.length === completedTodosCount}
				<p class="text-md mt-2">Good job! you have completed all your todos, add some more!</p>
			{/if}
		</div>
		<AddTodo></AddTodo>
	</div>
</section>
