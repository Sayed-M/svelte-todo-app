<script lang="ts">
	import { page } from '$app/stores';
	import type { IFolder } from '$lib/models/models';
	import { folders } from '$lib/stores/folders';
	import Todo from '$lib/components/Todo.svelte';
    import { v4 as uuidv4 } from 'uuid';

	let folder: IFolder;

	let todoName: string;
	let todoDescription: string;

	let isCreateDisabled = true;

	let addTodo = () => {
		if (todoName && todoDescription) {
			let newTodo = {
            	id: uuidv4(),
				name: todoName,
				description: todoDescription
			}
			folder.todos = [
				newTodo,
				...folder.todos
			]
			todoName = '';
			todoDescription = '';
			isCreateDisabled = true
		}
	}

	$: {
		
		folder = $folders.find(folder => folder.id === $page.params.id);

		todoName && todoDescription ? isCreateDisabled = false : true;

	}

</script>

<svelte:head>
	<title>todos of folder {folder.name}</title>
</svelte:head>

<h2>folder name: {folder?.name} #{folder?.id}</h2>
<br>
<div class="flex justify-between">
	<div class="flex flex-col">
		<h3>Todos</h3>
		{#if folder.todos.length}
			{#each folder.todos as todo}
				<Todo {todo} folderId={folder.id}></Todo>
			{/each}
			{:else}
			<p>No todos in this folder, create some!</p>
		{/if}
	</div>
	
	<form on:submit|preventDefault={addTodo}>
		<div class="flex flex-col p-4 min-w-[300px] border-l border-primary">
			<input type="text" bind:value={todoName} class="input mb-4" placeholder="todo name">
			<input type="text" bind:value={todoDescription} class="input mb-4" placeholder="todo description">
			<button type="submit" class="btn" disabled={isCreateDisabled}>Create</button>
		</div>
	</form>
</div>
