<script lang="ts">
	import Todo from "$lib/components/Todo.svelte";
	import { TodosTabs } from "$lib/enums/enums";
    import { folderDetails } from "$lib/stores/folders";

    export let activeTab: TodosTabs = TodosTabs.Active;


</script>

<div>
    {#if activeTab === TodosTabs.Active && !$folderDetails.activeTodosCount &&  !$folderDetails.completedTodosCount}
        <p class="text-md mt-2">No todos yet in this folder, Add some!</p>
    {/if}
    {#if activeTab === TodosTabs.Active && !$folderDetails.activeTodosCount && $folderDetails.completedTodosCount}
        <p class="text-md mt-2">Good job! you have completed all your todos, add some more!</p>
    {/if}
    {#if activeTab === TodosTabs.Completed && !$folderDetails.todos?.length}
        <p class="text-md mt-2">You haven't completed any Todo yet!</p>
    {/if}

    {#if $folderDetails.todos?.length}
        <div class="flex flex-wrap gap-4 mb-10">
            {#each $folderDetails.todos as todo}
                <Todo {todo} 
                folder={$folderDetails.folder} 
                showEdit={activeTab === TodosTabs.Active} 
                showComplete={activeTab === TodosTabs.Active}></Todo>
            {/each}
        </div>
    {/if}
</div>