<script setup lang="ts">
import type TaskType from "../../common/types/task";

const task = ref<string>("");
const { data: tasks, refresh } = await useFetch<TaskType[]>("/api/tasks");
const activeTasks = computed(() =>
  (tasks?.value || [])?.filter((t) => !t.completed_at)
);
const archivedTasks = computed(() =>
  (tasks?.value || [])?.filter((t) => !!t.completed_at)
);

const setTask = (val: string): void => {
  task.value = val;
};

const add = async (): Promise<void> => {
  if (!task.value) return;
  await $fetch<TaskType>("/api/tasks", { 
    method: "POST",
    body : {
      description: task.value,
      created_at: new Date(),
      updated_at: new Date(),
  }}).finally(() => {
    refresh();
  });
};

const edit = async (task: TaskType) => {
    if(!task.id) return;
    await $fetch<TaskType>(`/api/tasks/${task.id}`, { method: "PUT", body: task }).finally(() => refresh());
};
const remove = async (taskId: string): Promise<void> => {
    if(!taskId) return;
    await $fetch<TaskType>(`/api/tasks/${taskId}`, { method: "DELETE" }).finally(() => refresh());
};
</script>
<template>
  <div class="tasks--header">
    <Input
      class="tasks--input"
      id="task--input"
      type="text"
      :value="task"
      :onChange="setTask"
      :placeholder="$t('task.placeholder')"
    />
    <button @click="async () => {await add(); setTask('')}" class="pill-segment" :disabled="!task">
      {{ $t("task.add") }}
    </button>
  </div>
  <ul class="tasks">
    <li v-for="task in activeTasks" :key="task.id">
      <Task
        :id="task.id!"
        :description="task.description"
        :created_at="task.created_at"
        :updated_at="task.updated_at"
        :completed_at="task.completed_at"
        :onChange="(task) => edit(task)"
        :onDelete="(taskId) => remove(taskId)"
      />
    </li>
    <li v-if="activeTasks.length === 0">
      {{ $t("task.empty") }}
    </li>
  </ul>
  <h2 class="underlined">{{ $t("task.archive") }}</h2>
  <ul class="tasks">
    <li v-for="task in archivedTasks" :key="task.id">
      <Task
        :id="task.id!"
        :description="task.description"
        :created_at="task.created_at"
        :updated_at="task.updated_at"
        :completed_at="task.completed_at"
        :onChange="(task) => edit(task)"
        :onDelete="(taskId) => remove(taskId)"
      />
    </li>
    <li v-if="activeTasks.length === 0">
      {{ $t("task.empty_archive") }}
    </li>
  </ul>
</template>
