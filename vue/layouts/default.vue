<script setup>
    useHead({
        title: "Tasky Vue",
        bodyAttrs: {
            class: 'secondary-bg'
        }
    })
</script>
<template>
    <main className="container">
        <h1 className="underlined">Tasky</h1>
        <slot />
    </main>
</template>