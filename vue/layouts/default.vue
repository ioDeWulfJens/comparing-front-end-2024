<script setup>
    useHead({
        title: "Tasky Vue",
        bodyAttrs: {
            class: 'secondary-bg'
        }
    })
</script>
<template>
    <main class="container">
        <h1 class="underlined">Tasky</h1>
        <slot />
    </main>
</template>