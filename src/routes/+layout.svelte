<script lang="ts">
	import Folders from "$lib/components/Folders.svelte";
	import "../app.postcss";
</script>

<main class="flex gap-4 flex-row min-h-screen">
	<aside class="w-[200px] border-indigo-600 border-r">
		<Folders></Folders>
	</aside>
	<section class="grow">
		<slot />
	</section>
</main>