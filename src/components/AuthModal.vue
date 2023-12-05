<script setup>
  import {ref} from "vue";

  const visible = ref(false);

  const showModal = () => {
    visible.value = true;
  };

  const handleOk = (e) => {
    console.log(e);
    visible.value = false;
  };

</script>

<template>
  <div>
    <n-button type="primary" @click="showModal">Log in</n-button>
    <n-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <p class="my-4">Hello from modal!</p>
    </n-modal>
  </div>
</template>

<style scoped>

</style>