<script lang="ts">
	import type { IFolder, ITodo } from "$lib/models/models";
	import Todo from "$lib/components/Todo.svelte";
	import { TodosTabs } from "$lib/enums/enums";

    export let todos: ITodo[] = [];
    export let folder: IFolder;
    export let activeTodosCount: number;
    export let completedTodosCount: number;
    export let activeTab: TodosTabs = TodosTabs.Active;
</script>

<div>
    {#if activeTab === TodosTabs.Active && !activeTodosCount &&  !completedTodosCount}
        <p class="text-md mt-2">No todos yet in this folder, Add some!</p>
    {/if}
    {#if activeTab === TodosTabs.Active && !activeTodosCount && completedTodosCount}
        <p class="text-md mt-2">Good job! you have completed all your todos, add some more!</p>
    {/if}
    {#if activeTab === TodosTabs.Completed && !todos.length}
        <p class="text-md mt-2">You haven't completed any Todo yet!</p>
    {/if}

    {#if todos.length}
        <div class="flex flex-wrap gap-4 mb-10">
            {#each todos as todo}
                <Todo {todo} 
                {folder}
                showEdit={activeTab === TodosTabs.Active} 
                showComplete={activeTab === TodosTabs.Active}></Todo>
            {/each}
        </div>
    {/if}
</div>