<script lang="ts">
	import TodosPage from "$lib/components/TodosPage.svelte";
	import { TodosTabs } from "$lib/enums/enums";
</script>

<TodosPage activeTab={TodosTabs.Active} />
