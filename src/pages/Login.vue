<template>
  <div>
    <h2>Login</h2>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    }
  },
  computed: mapState({ user: state => state.user }),
}
</script>
