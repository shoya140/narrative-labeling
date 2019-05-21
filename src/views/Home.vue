<template>
  <div class="home">
    <h1>Title</h1>
    <p>Description about the experiment</p>
    <p><el-button @click="hello()">Eye tracker calibration</el-button></p>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data: function () {
    return {
    }
  },
  methods: {
    hello: function () {
      console.log('hello')
    }
  }
}
</script>

<style lang="scss">

.home {
  max-width: 800px;
  margin: 50px auto;
  padding: 30px;
}

</style>
