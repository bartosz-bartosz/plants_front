<script setup>
import "@fontsource/montserrat"
import {RouterLink} from "vue-router";
import {ref} from "vue";

import {useUserStore} from "@/stores/users";
import {storeToRefs} from "pinia";

const userStore = useUserStore();
const {user} = storeToRefs(userStore);

const isHovered = ref(false)
</script>

<template>
  <div class="navbar">
    <Transition name="logo-hover">
      <RouterLink to="/" tag="h1" class="logo"
                  @mouseover="isHovered=true" @mouseleave="isHovered=false">
        Plants
      </RouterLink>
    </Transition>
    <div class="links">
      <RouterLink to="/" :class="{'link': true, 'active': $route.path === '/'}">HOME</RouterLink>
      <RouterLink to="/my-plants" :class="{'link': true, 'active': $route.path === '/my-plants'}">PLANTS</RouterLink>
      <!--      <RouterLink to="/watering" :class="{'link': true, 'active': $route.path === '/watering'}">WATERING</RouterLink>-->
      <RouterLink v-if="!user" to="/login" :class="{'link': true, 'active': $route.path === '/login'}">LOG IN</RouterLink>
      <RouterLink v-if="user"
                  to="/profile"
                  id="profile-tab"
                  :class="{'link': true, 'active': $route.path === '/profile'}">PROFILE
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  padding: 10px 5%;
  height: 80px;
  justify-content: space-between;
  align-items: center;
  display: flex;
  box-shadow: rgba(22, 31, 19, 0.2) 0 5px 10px;

}

.links {
  display: flex;
}

.links .link {
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  padding-left: 10px;
  padding-right: 10px;
  text-decoration: none;
  color: var(--dark-main);
  cursor: pointer;
  padding-bottom: 10px;
  border-bottom: var(--light-bg) 8px solid;
}

.links .link:hover {
  border-bottom-color: var(--dark-bg);
}

.links .link.active {
  border-bottom-color: var(--dark-bg);
}

.logo {
  font-family: SansSerif, serif;
  font-size: 36px;
  font-weight: bold;
  text-decoration: none;
  color: var(--dark-bg);
  padding-bottom: 1px;
  border-bottom: var(--light-bg) 8px solid;
  cursor: pointer;
}

.logo:hover {
  border-bottom: var(--dark-bg) 8px solid;
}

.logo-hover-enter-active {
  transition: all 2s ease;
}

.logo-hover-enter-from {
  border-bottom: var(--light-bg) 8px solid;
}

.logo-hover-enter-to, .logo-hover-leave-to {
  border-bottom: var(--dark-bg) 8px solid;
}

</style>