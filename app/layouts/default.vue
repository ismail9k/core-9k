<template>
  <div class="min-h-screen bg-white text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
    <div class="mx-auto flex min-h-screen max-w-2xl flex-col px-4">
      <header class="flex items-center justify-between py-8">
        <NuxtLink to="/" class="font-semibold">Abdelrahman Ismail</NuxtLink>
        <nav class="flex gap-6 text-sm">
          <NuxtLink to="/" class="hover:text-zinc-500" active-class="font-medium">Home</NuxtLink>
          <NuxtLink to="/blog" class="hover:text-zinc-500" active-class="font-medium">Blog</NuxtLink>
          <NuxtLink to="/projects" class="hover:text-zinc-500" active-class="font-medium">Projects</NuxtLink>
        </nav>
      </header>
      <main class="flex-1">
        <slot />
      </main>
      <footer class="flex justify-between py-8 text-sm text-zinc-500">
        <span>© {{ new Date().getFullYear() }}</span>
        <div class="flex gap-4">
          <a href="https://github.com/ismail9k" target="_blank" rel="noopener">GitHub</a>
          <a href="/rss.xml">RSS</a>
        </div>
      </footer>
    </div>
  </div>
</template>
