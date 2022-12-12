<script setup>
import PostView from './modules/posts/PostView.vue';
import CategoryView from './modules/categories/CategoryView.vue';
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <router-link to="/" class="navbar-brand">Posts</router-link>
        <router-link to="/categories" class="nav-link active">Categorías</router-link>
      </div>
    </div>
  </div>
</nav> 
<router-view></router-view>
</template>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  margin-bottom: 15px;
  padding: 30px;
}


</style>
