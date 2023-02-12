<script lang="ts">
	import { page } from '$app/stores';
	import type { IFolder, ITodo } from '$lib/models/models';
	import { folders } from '$lib/stores/folders';
	import Todo from '$lib/components/Todo.svelte';
    import { v4 as uuidv4 } from 'uuid';

	let folder: IFolder;

	let todoName: string;
	let todoDescription: string;

	let isAddDisabled: boolean = true;

	let addTodo = () => {
		if (todoName && todoDescription) {
			const newTodo: ITodo = {
            	id: uuidv4(),
				name: todoName,
				description: todoDescription
			}
			folder.todos = [
				newTodo,
				...folder.todos
			]
			folders.update((currentFolders) => {
				return currentFolders;
			});

			todoName = '';
			todoDescription = '';
			isAddDisabled = true;
		}
	}

	$: {
		
		folder = $folders.find(folder => folder.id === $page.params.folderId);

		todoName && todoDescription ? isAddDisabled = false : true;

	}

</script>

<svelte:head>
	<title>{folder.name} Todos</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		<div class="flex flex-col grow min-w-[250px]">
			<h3 class="text-xl font-bold mb-4 capitalize break-all">{folder.name} Todos</h3>
			{#if folder.todos.length}
				<div class="flex flex-wrap gap-4">
					{#each folder.todos as todo}
						<Todo {todo} folderId={folder.id}></Todo>
					{/each}
				</div>
				{:else}
				<p class="text-md mt-2">No todos yet in this folder, Add some!</p>
			{/if}
		</div>
		
		<form on:submit|preventDefault={addTodo}>
			<div class="bg-slate-800 w-[300px] border-indigo-600 border-r mr-4">
				<div class="flex flex-col p-4 min-w-[300px] border-l border-primary">
					<h3 class="text-white font-bold">Add a new Todo</h3>
					<div>
						<label for="" class="label">
							<span class="label-text text-white">Name</span>
						</label>
						<input type="text" bind:value={todoName} class="input w-full" placeholder="Todo name">
					</div>
					<div>
						<label for="" class="label">
							<span class="label-text text-white">Description</span>
						</label>
						<input type="text" bind:value={todoDescription} class="input w-full" placeholder="Todo description">
					</div>
					<button type="submit" class="btn btn-primary bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 mt-4" disabled={isAddDisabled}>Add</button>
				</div>
			</div>
		</form>
	</div>
</section>
