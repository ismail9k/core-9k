<script setup lang="ts">
useSeoMeta({ title: 'Abdelrahman Ismail', description: 'Personal website and blog.' })

const { data: posts } = await useAsyncData('latest-posts', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all(),
)
</script>

<template>
  <section class="py-12">
    <p class="text-sm font-semibold uppercase tracking-wide text-accent-600 dark:text-accent-400">Software engineer</p>
    <h1 class="mt-2 text-4xl font-bold tracking-tight">
      Hi, I'm <span class="text-accent-600 dark:text-accent-400">Abdelrahman</span> 👋
    </h1>
    <p class="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
      I'm a software engineer who loves building for the web. This is where I write about things I learn.
    </p>
    <div class="mt-8 flex gap-3 text-sm font-medium">
      <NuxtLink to="/blog" class="rounded-full bg-accent-600 px-4 py-2 text-white hover:bg-accent-500">Read the blog</NuxtLink>
      <a href="https://github.com/ismail9k" target="_blank" rel="noopener" class="rounded-full border border-accent-600 px-4 py-2 text-accent-600 hover:bg-accent-50 dark:border-accent-400 dark:text-accent-400 dark:hover:bg-accent-950">GitHub</a>
    </div>
  </section>
  <section class="border-t border-zinc-200 py-8 dark:border-zinc-800">
    <h2 class="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-600 dark:text-accent-400">Latest posts</h2>
    <PostCard v-for="post in posts" :key="post.path" :post="post" />
    <NuxtLink to="/blog" class="mt-4 inline-block text-sm font-medium text-accent-600 hover:underline dark:text-accent-400">All posts →</NuxtLink>
  </section>
</template>
