<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first(),
)
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({ title: post.value.title, description: post.value.description })
</script>

<template>
  <article v-if="post" class="py-8">
    <time class="text-sm text-zinc-500">{{ new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' }) }}</time>
    <h1 class="mt-1 text-3xl font-bold tracking-tight">{{ post.title }}</h1>
    <ContentRenderer :value="post" class="prose prose-zinc mt-8 max-w-none dark:prose-invert" />
  </article>
</template>
