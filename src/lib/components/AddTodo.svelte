<script lang="ts">
    import { v4 as uuidv4 } from 'uuid';
	import type { ITodo } from "$lib/models/models";
	import { mainController } from '$lib/controllers/controllers';
	import { folderDetails } from '$lib/stores/folders';

    let todoName: string;
	let todoDescription: string;

	let isAddDisabled: boolean = true;

    $: {
        if (todoName && todoDescription) {
            isAddDisabled = false
        } else {
            isAddDisabled = true
        }
    }

    let addTodo = () => {
        const controller = mainController();
        if (todoName && todoDescription) {
            const newTodo: ITodo = {
                id: uuidv4(),
                name: todoName,
                description: todoDescription,
                isCompleted: false
            }
            controller.addTodo($folderDetails.folder.id, newTodo);

            todoName = '';
            todoDescription = '';
            isAddDisabled = true;
        }
    }
</script>

<form on:submit|preventDefault={addTodo}>
    <div class="bg-slate-800 w-[300px] mr-4 rounded-xl">
        <div class="flex flex-col p-4 min-w-[300px]">
            <h3 class="text-white font-bold">Add a new Todo</h3>
            <div>
                <label for="" class="label">
                    <span class="label-text text-white">Name</span>
                </label>
                <input type="text" bind:value={todoName} class="input w-full" placeholder="Todo name">
            </div>
            <div>
                <label for="" class="label">
                    <span class="label-text text-white">Description</span>
                </label>
                <textarea bind:value={todoDescription} class="textarea w-full" placeholder="Todo description" rows="5"></textarea>
            </div>
            <button type="submit" class="btn btn-primary bg-sky-500 hover:bg-sky-600 disabled:bg-slate-300 mt-4" disabled={isAddDisabled}>Add</button>
        </div>
    </div>
</form>