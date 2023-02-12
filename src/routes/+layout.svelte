<script lang="ts">
	import "../app.postcss";
	import type { IFolder } from '../lib/models/models';
	import Folder from "../lib/components/Folder.svelte";
	import { folders } from "../lib/stores/folders";
	import Todos from '../lib/components/Todos.svelte';
	import { v4 as uuidv4 } from 'uuid';
	// import Header from './Header.svelte';
	// import './styles.css';

	let folderName = '';

	let addFolder = () => {
		if (folderName) {
			let newFolder: IFolder = {
				id: uuidv4(),
				name: folderName
			}
			folders.update(currentFolders => {
				return [newFolder, ...currentFolders];
			})
		}
		folderName = '';
	}
</script>

<main class="flex gap-4 flex-row min-h-screen">
	<aside class="w-[200px] border-indigo-600 border-r">
		<form on:submit|preventDefault={addFolder}>
			<input type="text" placeholder="Type here" bind:value={folderName} class="input w-full max-w-xs" />
		</form>
		<ul class="bg-base-100 mt-4">
			{#each $folders as folder}
				<Folder {folder}></Folder>
			{/each}
		</ul>		  
	</aside>
	<section class="grow">
		<Todos></Todos>
	</section>
</main>

<!-- <div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div> -->

<style>
	/* .app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	} */
</style>
