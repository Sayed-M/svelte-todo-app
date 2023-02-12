<script>
	import { folders } from "$lib/stores/folders";
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section class="pt-8">

	{#if $folders.length}
		<p class="text-lg">Select a folder from the side menu!</p>
		{:else}
		<p class="text-lg">Start by creating folders!</p>
	{/if}

</section>

<style>

</style>
