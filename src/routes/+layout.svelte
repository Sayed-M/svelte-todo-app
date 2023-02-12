<script lang="ts">
	import "../app.postcss";
	import Folders from "$lib/components/Folders.svelte";
</script>

<main class="flex gap-4 flex-row min-h-screen">
	<aside class="bg-slate-800 min-w-[300px] w-[300px] py-6">
		<Folders></Folders>
	</aside>
	<section class="grow">
		<slot />
	</section>
</main>