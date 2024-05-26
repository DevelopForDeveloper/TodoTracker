<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from "vue";
import axios from "axios";
const router = useRouter();

const navigateToABV = () => {
  router.push('/abv');
}

</script>

<template>
  <div id="app"/>
</template>

<style>

</style>