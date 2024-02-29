<script lang="ts">
  import Tasks from "@/components/Tasks.svelte";
  import type { PageData } from './$types';
  export let data: PageData;

</script>
<svelte:head>
    <title>Tasky Svelte</title>
</svelte:head>
<Tasks tasks={data.tasks} />
