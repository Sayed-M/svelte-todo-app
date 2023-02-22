<script lang="ts">
	import AddTodo from '$lib/components/AddTodo.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import { TodosTabs } from '$lib/enums/enums';
	import Todos from '$lib/components/Todos.svelte';
	import { activeFolder } from '$lib/stores/stores';

    export let activeTab: TodosTabs;

</script>

<svelte:head>
	<title>{$activeFolder.folder?.name} Todos</title>
</svelte:head>

<section class="pt-6">
	<div class="flex justify-between gap-4">
		<div class="flex flex-col grow min-w-[250px]">
			<h3 class="text-xl font-bold mb-4 capitalize break-all">{$activeFolder.folder?.name}</h3>
			<Tabs {activeTab} />
			<Todos {activeTab} />
		</div>
		{#if activeTab === TodosTabs.Active}
            <AddTodo></AddTodo>
        {/if}
	</div>
</section>
