<script lang="ts">
	import type { IFolder, ITodo } from '$lib/models/models';
    import { folders } from '../stores/folders';
	import Todo from './Todo.svelte';

    let todos: ITodo[] = [
        {
            name: 'my first todo',
            description: 'my first todo description'
        },
        {
            name: 'my second todo',
            description: 'my second todo description'
        },
        {
            name: 'my third todo',
            description: 'my third todo description'
        }
    ]

    // let todos: ITodo[] = [];
</script>

{#if $folders.length}
    {#if todos.length}
        {#each todos as todo}
            <Todo {todo}></Todo>
        {/each}
        {:else}
        No Todo found in this folder!
    {/if}
    {:else}
    Start by adding new folders!
{/if}