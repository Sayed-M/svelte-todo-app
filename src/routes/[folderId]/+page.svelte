<script lang="ts">
	import { page } from '$app/stores';
	import type { IFolder, ITodo } from '$lib/models/models';
	import { folders } from '$lib/stores/folders';
	import Todo from '$lib/components/Todo.svelte';
	import AddTodo from '$lib/components/AddTodo.svelte';

	let folder: IFolder;
	let completedTodos: ITodo[] = [];
	let completedTodosCount: number = 5;

	$: {
		
		folder = $folders.find(folder => folder.id === $page.params.folderId);

		completedTodos = folder?.completedTodos ? folder.completedTodos : [];

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
				<span class="bg-sky-600 text-white rounded p-2 cursor-default">Todos ({folder?.activeTodos.length})</span>
				{#if completedTodosCount}
					<a href="/{folder?.id}/completed" class="bg-gray-600 text-white rounded p-2">Completed ({completedTodosCount})</a>
				{/if}
			</p>
			{#if !folder?.activeTodos.length &&  !folder?.completedTodos.length}
				<p class="text-md mt-2">No todos yet in this folder, Add some!</p>
			{/if}
			{#if folder?.activeTodos.length}
				<div class="flex flex-wrap gap-4 mb-10">
					{#each folder?.activeTodos as todo}
						<!-- {#if !todo.isCompleted} -->
							<Todo {todo} folderId={folder?.id}></Todo>
						<!-- {/if} -->
					{/each}
				</div>
			{/if}
			{#if !folder?.activeTodos.length && folder?.completedTodos.length}
				<p class="text-md mt-2">Good job! you have completed all your todos, add some more!</p>
			{/if}
		</div>
		<AddTodo></AddTodo>
	</div>
</section>
