<script setup lang="ts">
useSeoMeta({ title: 'Blog', description: 'All posts.' })

const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('blog').order('date', 'DESC').all(),
)
</script>

<template>
  <h1 class="py-8 text-3xl font-bold tracking-tight">Blog</h1>
  <div class="divide-y divide-zinc-200 dark:divide-zinc-800">
    <PostCard v-for="post in posts" :key="post.path" :post="post" />
  </div>
</template>
