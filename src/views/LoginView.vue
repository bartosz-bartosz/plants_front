<script setup>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import { useStore } from 'vuex';

const form = {
  username: '',
  password: '',
};

const store = useStore();

async function submit() {
  const User = new FormData();
  User.append('username', form.username);
  User.append('password', form.password);
  await store.dispatch('logIn', User);
  this.$router.push('/dashboard');
}

</script>

<template>
  <section>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="username" class="form-label">Username:</label>
        <input type="text" name="username" v-model="form.username" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password:</label>
        <input type="password" name="password" v-model="form.password" class="form-control" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
</template>

<style scoped>

</style>