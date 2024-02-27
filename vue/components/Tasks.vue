<script setup lang="ts">
    import type TaskType from "@common/types/task";

    const task = ref<string>("");
    const tasks = ref<TaskType[]>([]);
    const activeTasks = computed(() => tasks.value.filter(t => !t.completed_at));
    const archivedTasks = computed(() => tasks.value.filter(t => !!t.completed_at));

    const setTask = (val: string): void => {
        task.value = val;
    };

    const add = (): Promise<void> => {
        if(!task.value) return new Promise(() => undefined);
        return new Promise(() => undefined);
    }
    const edit = (task: TaskType) => {
        
    }
    const remove = (taskId: string) => {

    }
</script>
<template>
    <div class="tasks--header">
        <Input class="tasks--input" id="task--input" type="text" :value="task" :onChange="setTask" :placeholder="$t('task.placeholder')"/>
        <button @click="add" class="pill-segment" :disabled="!task">
            {{$t("task.add")}}
        </button>
    </div>
    <ul class="tasks">
        <li v-for="task in activeTasks" :key="task.id">
            <Task :id="task.id!" :description="task.description"
            :created_at="task.created_at" :updated_at="task.updated_at"
            :completed_at="task.completed_at" :onChange="(task) => edit(task)" :onDelete="(taskId) => remove(taskId)" />
        </li>
        <li v-if="activeTasks.length === 0">
            {{$t("task.empty")}}
        </li>
    </ul>
    <h2 class="underlined">{{$t("task.archive")}}</h2>
    <ul class="tasks">
        <li v-for="task in archivedTasks" :key="task.id">
        </li>
        <li v-if="activeTasks.length === 0">
            {{$t("task.empty_archive")}}
        </li>
    </ul>
</template>