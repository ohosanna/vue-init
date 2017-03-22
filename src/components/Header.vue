<template>
  <nav class="navbar navbar-fixed-top navbar-default" id="header">
    <router-link :to="{name: 'welcome', params: {username: 'God'}}">欢迎</router-link>
    <router-link to="/login">登录</router-link>
  </nav>
</template>
<script>
  export default{
    name: 'header-component'
  }
</script>
