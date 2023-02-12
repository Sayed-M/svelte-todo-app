<script lang="ts">
	import type { ITodo } from "$lib/models/models";
	import { folders } from "$lib/stores/folders";

    export let todo: ITodo;
    export let folderId: string;

    let deleteTodo = () => {
        let currentFolder = $folders.find(folder => folder.id === folderId)
        let updatedTodos = currentFolder?.todos.filter(td => td.id !== todo.id);
        currentFolder.todos = [...updatedTodos]

        folders.update((currentFolders) => {
            return currentFolders;
        })
    }

let editTodo = () => {
    
}

</script>

<div class="card card-compact w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{todo?.name}</h2>
      <p>{todo?.description}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-outline text-slate-500" on:click={editTodo}>Edit</button>
        <button class="btn btn-success text-white" on:click={deleteTodo}>Done</button>
      </div>
    </div>
</div>