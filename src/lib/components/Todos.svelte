<script lang="ts">
	import Todo from "$lib/components/Todo.svelte";
	import { TodosTabs } from "$lib/enums/enums";
	import { derived } from "svelte/store";
	import { folders } from "$lib/stores/folders";
	import { page } from "$app/stores";

    export let activeTab: TodosTabs = TodosTabs.Active;

    export const myDerivedStore =derived([folders, page], ([$folders, $page]) => {
        const folder = $folders.find(folder => folder.id === $page.params.folderId);
        let todos;
        let activeTodosCount;
        let completedTodosCount;
        if ($page.url.pathname.includes('completed')) {
            todos = folder?.completedTodos;
            completedTodosCount = folder?.completedTodos.length;
        } else {
            todos = folder?.activeTodos;
            activeTodosCount = folder?.activeTodos.length;
        }
        return {
            folder,
            todos,
            activeTodosCount,
            completedTodosCount
        }
    });
</script>

<div>
    {#if activeTab === TodosTabs.Active && !$myDerivedStore.activeTodosCount &&  !$myDerivedStore.completedTodosCount}
        <p class="text-md mt-2">No todos yet in this folder, Add some!</p>
    {/if}
    {#if activeTab === TodosTabs.Active && !$myDerivedStore.activeTodosCount && $myDerivedStore.completedTodosCount}
        <p class="text-md mt-2">Good job! you have completed all your todos, add some more!</p>
    {/if}
    {#if activeTab === TodosTabs.Completed && !$myDerivedStore.todos?.length}
        <p class="text-md mt-2">You haven't completed any Todo yet!</p>
    {/if}

    {#if $myDerivedStore.todos?.length}
        <div class="flex flex-wrap gap-4 mb-10">
            {#each $myDerivedStore.todos as todo}
                <Todo {todo} 
                folder={$myDerivedStore.folder} 
                showEdit={activeTab === TodosTabs.Active} 
                showComplete={activeTab === TodosTabs.Active}></Todo>
            {/each}
        </div>
    {/if}
</div>