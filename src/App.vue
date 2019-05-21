<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

html, body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
}

</style>
