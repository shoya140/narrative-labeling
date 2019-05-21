<template>
  <div id="app">
    <div id="titlebar"></div>
    <router-view/>
  </div>
</template>

<style lang="scss">

html, body {
  margin: 0;
}

#titlebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 25px;
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
}

</style>
