<template>
  <div id="app">
<router-view></router-view>
  </div>
</template>

<script>
// import aa from './views/aa.vue'

export default {
  name: 'App',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  components: {
    // aa
  }
}
</script>

<style lang="css" >
  *{
    text-decoration: none !important;
  }
</style>
