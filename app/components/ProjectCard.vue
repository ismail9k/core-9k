<script setup lang="ts">
defineProps<{ project: { title: string, description: string, tags?: string[], repo?: string, demo?: string, image?: string } }>()
</script>

<template>
  <div class="flex gap-4 py-4">
    <img v-if="project.image" :src="project.image" :alt="project.title" class="h-14 w-18 shrink-0 rounded-lg object-cover sm:h-18 sm:w-24">
    <div v-else class="flex h-14 w-18 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xl font-semibold text-zinc-500 sm:h-18 sm:w-24 dark:bg-zinc-800 dark:text-zinc-400">
      {{ project.title.charAt(0) }}
    </div>
    <div>
      <h3 class="font-semibold">
        {{ project.title }}
        <span v-if="project.repo || project.demo" class="ml-1 text-sm font-normal">
          <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener" class="hover:text-accent-600 dark:hover:text-accent-400">GitHub</a>
          <span v-if="project.repo && project.demo" class="text-zinc-400"> · </span>
          <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener" class="hover:text-accent-600 dark:hover:text-accent-400">Demo</a>
        </span>
      </h3>
      <p class="text-zinc-600 dark:text-zinc-400">{{ project.description }}</p>
      <p v-if="project.tags?.length" class="mt-1 text-xs text-zinc-500">{{ project.tags.join(' · ') }}</p>
    </div>
  </div>
</template>
