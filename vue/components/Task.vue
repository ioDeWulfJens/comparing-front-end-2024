<script setup lang="ts">
    import type TaskType from "@common/types/task";
    import { formatRelativeDate } from "../../common/utils/dateUtils";

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
    } = defineProps<TaskProps>();
    const editing = ref<boolean>(false);
    const value = ref<string>(description);
    const complete = (checked: boolean): void => {
        onChange({ id, description, completed_at: checked ? new Date() : undefined, created_at, updated_at });
    };

    const edit = (): void => {
        if(editing){
            onChange({ id, description: value.value, completed_at, created_at, updated_at: new Date() });
        }
        editing.value  = !editing.value;
    };

    const onValueChange = (val: string) => {
        value.value = val;
    }

    const formatDate = (date: Date | string): string => {
        date = typeof date === "string" ? new Date(date) : date;
        return formatRelativeDate(date, "be-NL");
    };

    const formatTimestamp = (date: Date | string): string => {
        date = typeof date === "string" ? new Date(date) : date;
        return date.toLocaleDateString("be-NL")
    }
</script>
<template>
    <div class="task--wrapper" :id="id">
        <div class="task" :class="{ complete: !!completed_at }">
            <Checkbox :checked="!!completed_at" :onChange="complete"/>
            <Input :id="`task-${id}`" type="text" :value="value"
            :disabled="!editing" class="task--input" :onChange="onValueChange"/>
            <div class="task--controls">
                <button v-if="!completed_at" class="pill-segment" @click="edit">{{ $t(editing ? "task.save" : "task.edit") }}</button>
                <button class="pill-segment" @click="onDelete(id)">{{ $t("task.delete") }}</button>
            </div>
        </div>
        <div class="task--meta">
            <div class="task--date" :title="formatDate(updated_at || created_at)">
                <span>{{ $t("task.created_at") }}</span>
                <span>{{ formatDate(created_at) }}</span>
            </div>
            <div v-if="completed_at" class="task--date"
            :title="formatDate(completed_at)">
                <span>{{ $t("task.completed_at") }}</span>
                <span>{{ formatTimestamp(completed_at) }}</span>
            </div>
        </div>
    </div>
</template>