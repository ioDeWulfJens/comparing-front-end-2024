<script lang="ts">
    import type TaskType from "@/common/types/task";
    import Input from "./Input.svelte";
    import Task from "./Task.svelte";
    import { t } from "$lib/i18n";
    import { invalidateAll } from "$app/navigation";

    const {
        tasks = []
    } = $props<{ tasks: TaskType[] }>();
    let task = $state<string>("");
    let posting = $state<boolean>(false);
    let activeTasks = $derived<TaskType[]>(tasks.filter((t) => !t.completed_at));
    let archivedTasks = $derived<TaskType[]>(tasks.filter((t) => !!t.completed_at));

    
    const onChange = async () => {
        invalidateAll();
        posting = false;
    }

    const add = async (): Promise<void> => {
        posting = true;
        const entry = await fetch("/tasks", {
            method: "POST",
            body: JSON.stringify({
                description: task,
                created_at: new Date(),
                updated_at: new Date(),
            })
        });
        if (entry) {
            task = "";
            onChange();
        }
    }

    const edit = async (task: TaskType): Promise<void> => {
        if (!task.id) return;
        posting = true;
        await fetch(`/tasks/${task.id}`, {
            method: "PUT",
            body: JSON.stringify({
                ...task
            })
        }).finally(() => onChange());
    }

    const remove = async (id: string): Promise<void> => {
        if(!id) return;
        posting = true;
        await fetch(`/tasks/${id}`, {
            method: "DELETE",
        }).finally(() => onChange());
    }
</script>
{#snippet taskDom(taskElement)}
{#key taskElement.id}
<li>
    <Task
        id={taskElement.id}
        description={taskElement.description}
        created_at={taskElement.created_at}
        updated_at={taskElement.updated_at}
        completed_at={taskElement.completed_at}
        onDelete={(taskId) => remove(taskId)}
        onChange={event => edit(event)}
    />
</li>
{/key}
{/snippet}
<div class="tasks--header">
    <Input className="tasks--input" id="task--input" type="text" value={task}
    onChange={(val) => task = val} placeholder={$t("task.placeholder")}/>
    <button on:click={add} class="pill-segment" disabled={!task || posting}>
        {$t("task.add")}
    </button>
</div>
<ul class="tasks">
    {#each activeTasks as at}
        { @render taskDom(at) }
    {/each}
</ul>
<h2 class="underlined">{$t("task.archive")}</h2>
<ul class="tasks">
    {#each archivedTasks as at}
        { @render taskDom(at) }
    {/each}
</ul>