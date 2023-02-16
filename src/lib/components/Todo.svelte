<script lang="ts">
    import type { IFolder, ITodo } from "$lib/models/models";
    import { folders } from "$lib/stores/folders";

    export let todo: ITodo;
    export let folder: IFolder;
    export let showEdit: boolean = true;
    export let showComplete: boolean = true;

    let completeTodo = () => {
        const updatedTodos: ITodo[] = folder.activeTodos.filter(td => td.id !== todo.id);
        folder.activeTodos = updatedTodos;

        todo.isCompleted = true;
        folder.completedTodos = [...folder.completedTodos, todo]
        folders.update((currentFolders) => {
            return currentFolders;
        })
    }

</script>

<div class="card card-compact w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title break-all">{todo.name}</h2>
      <p class="break-all">{todo.description}</p>
      <div class="card-actions justify-end">
        {#if showEdit}
          <a href="/{folder.id}/{todo.id}/edit" class="btn btn-outline text-slate-500">Edit</a>
        {/if}
        {#if showComplete}
          <button class="btn btn-success hover:btn-active text-white" on:click={completeTodo}>Complete</button>
        {/if}
      </div>
    </div>
</div>