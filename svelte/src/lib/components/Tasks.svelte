<script lang="ts">
    import type TaskType from "@/common/types/task";
    import Input from "./Input.svelte";
    import Task from "./Task.svelte";

    let task = $state<string>("");
    let tasks = $state<TaskType[]>([]);
    let activeTasks = $derived<TaskType[]>(tasks.filter((t) => !t.completed_at));
    let archivedTasks = $derived<TaskType[]>(tasks.filter((t) => !!t.completed_at));

    
    const onChange = async () => {
        // const res = await getData();
        // tasks = res;
    }

    const add = async (): Promise<void> => {
        // const entry = await postData({
        //     description: task,
        //     created_at: new Date(),
        //     updated_at: new Date(),
        // });
        // if (entry) {
        //     task = "";
        //     onChange();
        // }
    }

    const edit = async (task: TaskType): Promise<void> => {
        if (!task.id) return;
        // await postData(task).finally(() => onChange());
    }

    const remove = async (id: string): Promise<void> => {
        if(!id) return;
        // await removeData(id).finally(() => onChange());
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
    onChange={(val) => task = val} placeholder={t("task.placeholder")}/>
    <button onClick={add} class="pill-segment">
        {t("task.add")}
    </button>
</div>
<ul class="tasks">
    {#each activeTasks as at}
        { @render taskDom(at) }
    {/each}
</ul>
<h2 class="underlined">{t("task.archive")}</h2>
<ul class="tasks">
    {#each archivedTasks as at}
        { @render taskDom(at) }
    {/each}
</ul>