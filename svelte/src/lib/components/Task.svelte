<script lang="ts">
    import type TaskType from "@/common/types/task";
    import { formatRelativeDate } from "@/common/utils/dateUtils";
    import Input from "./Input.svelte";
    import Checkbox from "./Checkbox.svelte";
    import { t } from "$lib/i18n";

    type TaskProps = {
        id: string
        description: string
        completed_at?: Date
        created_at: Date
        updated_at: Date
        onChange: (task: TaskType) => void
        onDelete: (id: string) => void
    }
    const {
        id,
        description,
        completed_at,
        created_at,
        updated_at,
        onChange,
        onDelete,
    } = $props<TaskProps>();

    let editing = $state<boolean>(false);
    let value = $state<string>(description);
    const complete = (checked: boolean): void => {
        const created = typeof created_at === "string" ? new Date(created_at) : created_at;
        const updated = typeof updated_at === "string" ? new Date(updated_at) : updated_at;
        onChange({ id, description, completed_at: checked ? new Date() : undefined, created_at: created, updated_at: updated });
    };

    const edit = (): void => {
        if(editing){
            const created = typeof created_at === "string" ? new Date(created_at) : created_at;
            const completed = typeof completed_at === "string" ? new Date(completed_at) : completed_at;
            onChange({ id, description: value, completed_at: completed, created_at: created, updated_at: new Date() });
        }
        editing  = !editing;
    };

    const onValueChange = (val: string) => {
        value = val;
    }

    const formatDate = (date: Date | string): string => {
        date = typeof date === "string" ? new Date(date) : date;
        return formatRelativeDate(date, "be-NL");
    };

    const formatTimestamp = (date: Date | string): string => {
        date = typeof date === "string" ? new Date(date) : date;
        return `${date.toLocaleDateString("be-NL")}, ${date.toLocaleTimeString("be-NL")}`;
    }
</script>
<div class="task--wrapper" id={id}>
    <div class="task { !!completed_at && 'complete' }">
        <Checkbox checked={!!completed_at} onChange={complete}/>
        <Input id={`task-${id}`} type="text" value={value} disabled={!editing}
        className="task--input" onChange={onValueChange} />
        <div class="task--controls">
            {#if !completed_at}
                <button class="pill-segment" on:click={edit}>{ $t(editing ? "task.save" : "task.edit") }</button>
            {/if}
            
            <button class="pill-segment" on:click={() => onDelete(id)}>{ $t("task.delete") }</button>
        </div>
    </div>
    <div class="task--meta">
        <div class="task--date" title={formatTimestamp(updated_at || created_at)}>
            <span>{ $t(updated_at !== created_at? "time.updated" : "time.created") }</span>
            <span>{ formatDate(updated_at || created_at) }</span>
        </div>
        {#if completed_at}
            <div class="task--date" title={formatTimestamp(completed_at)}>
                <span>{ $t("time.completed") }</span>
                <span>{ formatDate(completed_at) }</span>
            </div>
        {/if}
    </div>
</div>