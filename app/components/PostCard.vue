<script setup lang="ts">
defineProps<{ post: { path: string, title: string, description?: string, date: string } }>()
</script>

<template>
  <NuxtLink :to="post.path" class="group block py-4">
    <time class="text-sm text-zinc-500">{{ new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'medium' }) }}</time>
    <h3 class="font-medium group-hover:text-accent-600 dark:group-hover:text-accent-400">{{ post.title }}</h3>
    <p v-if="post.description" class="text-zinc-600 dark:text-zinc-400">{{ post.description }}</p>
  </NuxtLink>
</template>
