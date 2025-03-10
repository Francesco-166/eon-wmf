<script setup lang="ts">
import { defineProps, defineComponent } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(defineProps<{ to: string; text: string }>(), {
  to: '/',
  text: 'defaultLINK',
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'RouterLink',
  to: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <RouterLink :to="props.to"> {{ props.text }} </RouterLink>
</template>
