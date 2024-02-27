<script setup lang="ts">
    type CheckboxProps = {
        label?: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
    };

    const {
        label,
        checked,
        onChange
    } = defineProps<CheckboxProps>();

    const toggle = () => {
        onChange(!checked);
    }
</script>
<template>
    <label v-if="label">{{ label }}</label>
    <input class="checkbox" type="checkbox" :checked="checked" @change="toggle" />
</template>
