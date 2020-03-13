<template>
  <div id="app">
    <div id="wrapper">
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Nav/>
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./components/Nav";

export default {
  name: 'App',
  components: {Nav, }
}
</script>

<style>
</style>
