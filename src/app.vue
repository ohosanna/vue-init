<template>
  <div class="app-main">
    <HeaderComponent />
    <router-view></router-view>
  </div>
</template>
<script>
  import HeaderComponent from './components/Header';

  export default {
    name: 'app',
    components: {
      HeaderComponent
    }
  }
</script>
