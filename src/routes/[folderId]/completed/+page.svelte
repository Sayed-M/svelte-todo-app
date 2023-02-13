<script lang="ts">
	import { page } from '$app/stores';
	import type { IFolder, ITodo } from '$lib/models/models';
	import { folders } from '$lib/stores/folders';
	import Todo from '$lib/components/Todo.svelte';

	let folder: IFolder;
	let completedTodos: ITodo[] = [];
	let completedTodosCount: number = 5;

	$: {
		
		folder = $folders.find(folder => folder.id === $page.params.folderId);

		completedTodos = folder.completedTodos;

		// completedTodosCount = completedTodos?.length ? completedTodos.length : 0;
		completedTodosCount = completedTodos.length;

	}

</script>

<svelte:head>
	<title>{folder?.name} Todos</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		<div class="flex flex-col grow min-w-[250px]">
			<h3 class="text-xl font-bold mb-4 capitalize break-all">{folder?.name}</h3>
			<p class="text-gray-500 text-sm font-semibold mb-4 capitalize break-all flex items-center gap-1">
				<a href="/{folder?.id}" class="bg-gray-600 text-white rounded p-2">Active ({folder?.activeTodos.length})</a>
				<span class="bg-sky-600 text-white rounded p-2 cursor-default">Completed ({completedTodosCount})</span>
			</p>
			{#if !folder?.completedTodos.length}
				<p class="text-md mt-2">You haven't completed any Todo yet!</p>
			{/if}
			{#if folder?.completedTodos.length}
				<div class="flex flex-wrap gap-4 mb-10">
					{#each folder?.completedTodos as todo}
						<Todo {todo} folderId={folder?.id} showEdit={false} showComplete={false}></Todo>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>
