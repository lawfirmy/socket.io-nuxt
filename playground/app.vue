<template>
  <div>
    Nuxt Socket.io Module

    <button @click="sendMessage">Send Message</button>

  </div>
</template>

<script setup>
import { useNuxtApp } from '#app';

const { $io } = useNuxtApp()

const sendMessage = () => {
  $io.emit('message', 'Hello World')
}

</script>
