<template>
  <div class="label">
    <h1>Date: {{ date }}</h1>
    <p><el-button id="stop-button" @click="stopLabeling">Stop Labeling</el-button></p>
  </div>
</template>

<script>

export default {
  name: 'label',
  components: {},
  data: function () {
    return {
      date: decodeURI(this.$route.params.date),
      path: decodeURI(this.$route.params.path)
    }
  },
  methods: {
    stopLabeling: function (e) {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="scss">

#stop-button {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
}

</style>
