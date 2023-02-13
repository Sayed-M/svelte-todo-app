<script lang="ts">
    import type { IFolder, ITodo } from "$lib/models/models";
    import { folders } from "$lib/stores/folders";

    export let todo: ITodo;
    export let folderId: string;

    let deleteTodo = () => {
        const currentFolder: IFolder = $folders.find(folder => folder.id === folderId)
        const updatedTodos: ITodo[] = currentFolder?.todos.filter(td => td.id !== todo.id);
        currentFolder.todos = [...updatedTodos]

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
        <a href="/{folderId}/todos/{todo.id}/edit" class="btn btn-outline text-slate-500">Edit</a>
        <button class="btn btn-success text-white" on:click={deleteTodo}>Done</button>
      </div>
    </div>
</div>