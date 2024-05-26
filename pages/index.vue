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

.btn-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.btn-start {
  border-radius: 5%;
  width: 200px;
  height: 60px;
  font-size: 24px;
  background-color: #a5c4cc;
  color: #4d769e;
  font-family: "UhBeeMiMi";
}
/*스타일링. */
</style>