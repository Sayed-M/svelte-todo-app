<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { IFolder, ITodo } from '$lib/models/models';
	import { folders } from '$lib/stores/folders';

	let folderId: string;
	let todoId: string;
	let todoIndex: number;

	let folder: IFolder;
	let todo: ITodo;

	let tempTodo :ITodo;
	let tempName: string;
	let tempDescription: string;

	let saved: boolean = false;
	let isSavingDisabled = true;

	$: {
		folderId = $page.params.folderId;
		todoId = $page.params.todoId;

		folder = $folders.find(folder => folder.id === folderId);
		todo = folder?.todos.find(todo => todo.id === todoId);
		
		tempName && tempDescription ? isSavingDisabled = false : true;
	}

	let saveTodo = () => {
		if (tempName && tempDescription) {
			tempTodo = Object.assign({}, {
				id: todo.id,
				name: tempName,
				description: tempDescription
			})
			todo = {...tempTodo}
			todoIndex = folder.todos.findIndex(todo => todo.id === todoId)
			folder.todos[todoIndex] = todo;
			saved = true;
			setTimeout(() => {
				saved = false;
				goto(`/folders/${folderId}`, { replaceState: true })
			}, 1000)
		}
	}

	let cancelEditing = () => {
		if (tempName === todo.name && tempDescription === todo.description) {
			// Navigate safely
			goto(`/folders/${folderId}`, { replaceState: true })
		} else {
			// unsaved changes
			let discardChanges = confirm('You have unsaved changes, do you want to dicard it?');
			discardChanges ? goto(`/folders/${folderId}`, { replaceState: true }) : null;
		}
	}

	onMount(async () => {
		tempTodo = Object.assign({}, {
			id: todo.id,
			name: todo.name,
			description: todo.description
		})
		tempName = tempTodo?.name;
		tempDescription = tempTodo?.description;
	});

</script>

<svelte:head>
	<title>Edit Todo {todo.name}</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		
		<form class="grow" on:submit|preventDefault={saveTodo}>
			<div class="grow mr-4">
				<div class="flex flex-col p-4">
					<h3 class="text-slate-900 text-xl font-semibold break-all">Edit Todo {todo.name}</h3>
					<div>
						<label for="" class="label">
							<span class="label-text text-slate-900">Name</span>
						</label>
						<input type="text" bind:value={tempName} class="input border-slate-400 w-full" autofocus placeholder="Todo name">
					</div>
					<div>
						<label for="" class="label">
							<span class="label-text text-slate-900">Description</span>
						</label>
						<input type="text" bind:value={tempDescription} class="input border-slate-400 w-full" placeholder="Todo description">
					</div>
					<div class="flex justify-end">
						<button type="button" class="btn btn-outline mt-4 mr-4" on:click={cancelEditing}>Cancel</button>
						<button type="submit" class="btn btn-primary bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 border-none mt-4 min-w-[200px]" disabled={isSavingDisabled}>Save</button>
					</div>
					{#if saved}
						<div class="flex justify-end">
							<p transition:fade class="text-md font-semibold text-success">Saved successfully!</p>
						</div>
					{/if}
				</div>
			</div>
		</form>
	</div>
</section>
