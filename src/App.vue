<template>
  <div id="app">
    <Navbar />
    <div class="content">
      <router-view />
    </div>
    <footer-custom />
  </div>
</template>
<script>
import Navbar from "./components/shared/Navbar";
import Foot from "./components/shared/Footer";

export default {
  components: {
    Navbar,
    "footer-custom": Foot,
  },
};
</script>
<style>
.mt-1 {
  margin-top: 1em;
}
.mt-2 {
  margin-top: 2em;
}
.mt-3 {
  margin-top: 3em;
}
.mt-4 {
  margin-top: 4em;
}
.mt-5 {
  margin-top: 5em;
}
* {
  padding: 0;
  margin: 0;
}
</style>
