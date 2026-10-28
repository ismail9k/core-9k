<script setup lang="ts">
useSeoMeta({ title: 'Projects', description: 'Things I have built.' })

const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').order('order', 'ASC').all(),
)
</script>

<template>
  <h1 class="py-8 text-3xl font-bold tracking-tight">Projects</h1>
  <div>
    <ProjectCard v-for="project in projects" :key="project.title" :project="project" />
  </div>
</template>
