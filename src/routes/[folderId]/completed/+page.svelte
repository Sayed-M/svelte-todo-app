<script lang="ts">
	import { page } from "$app/stores";
	import TodosPage from "$lib/components/TodosPage.svelte";
	import { TodosTabs } from "$lib/enums/enums";
	import type { IFolder } from "$lib/models/models";
	import { folders } from "$lib/stores/stores";

	let folder: IFolder;
</script>

<TodosPage activeTab={TodosTabs.Completed} />
