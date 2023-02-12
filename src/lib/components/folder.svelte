<script lang="ts">
    import type { IFolder } from "../models/models";

    export let folder: IFolder;

</script>

<li><a href="/{folder.id}" class="text-primary break-words">{folder.name}</a></li>