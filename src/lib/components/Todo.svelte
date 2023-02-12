<script lang="ts">
	import type { ITodo } from "$lib/models/models";


    export let todo: any;
</script>

<div class="card card-compact w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{todo?.name}</h2>
      <p>{todo?.description}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-primary">Done</button>
        <button class="btn btn-danger">Delete</button>
      </div>
    </div>
</div>