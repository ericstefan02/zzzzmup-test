<template>
  <p>vest {{ newsId }}</p>
</template>
<script lang="ts" setup>
const route = useRoute()
const newsId = route.params.id
</script>
