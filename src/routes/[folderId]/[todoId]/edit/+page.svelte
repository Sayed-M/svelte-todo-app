<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { ITodo } from '$lib/models/models';
	import { mainController } from '$lib/controllers/controllers';
	import { activeTodo, activeFolder } from '$lib/stores/folders';


	let tempTodo :ITodo;
	let tempName: string;
	let tempDescription: string;

	let saved: boolean = false;
	let isSavingDisabled: boolean = true;

	$: {
		if ((tempName === $activeTodo?.name && tempDescription === $activeTodo?.description) || !tempName || !tempDescription) {
			isSavingDisabled = true
		} else {
			isSavingDisabled = false
		}
	}

	let saveTodo = () => {
        const controller = mainController();
		if (tempName && tempDescription) {
			tempTodo = Object.assign({}, {
				id: $activeTodo.id,
				name: tempName.trim(),
				description: tempDescription.trim(),
				isCompleted: $activeTodo.isCompleted
			});
            controller.updateTodo($activeFolder.folder.id, $activeTodo.id, tempTodo);

			saved = true;
			setTimeout(() => {
				saved = false;
				goto(`/${$activeFolder.folder?.id}`, { replaceState: true })
			}, 1000)
		}
	}

	let cancelEditing = () => {
		if (tempName === $activeTodo?.name && tempDescription === $activeTodo?.description) {
			// Navigate safely
			goto(`/${$activeFolder.folder?.id}`, { replaceState: true })
		} else {
			// unsaved changes
			let discardChanges = confirm('You have unsaved changes, do you want to dicard it?');
			discardChanges ? goto(`/${$activeFolder.folder?.id}`, { replaceState: true }) : null;
		}
	}

	onMount(async () => {
		tempTodo = Object.assign({}, {
			id: $activeTodo.id,
			name: $activeTodo.name,
			description: $activeTodo.description,
			isCompleted: $activeTodo.isCompleted
		})
		tempName = tempTodo?.name;
		tempDescription = tempTodo?.description;
	});

</script>

<svelte:head>
	<title>Edit Todo {$activeTodo?.name}</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		
		<form class="grow" on:submit|preventDefault={saveTodo}>
			<div class="grow mr-4">
				<div class="flex flex-col p-4">
					<h3 class="text-slate-900 text-xl font-semibold break-all">Edit Todo {$activeTodo?.name}</h3>
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
						<textarea bind:value={tempDescription} class="textarea border-slate-400 w-full" placeholder="Todo description" rows="5"></textarea>
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
