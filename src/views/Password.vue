<template>
  <div>
    <div class="columns">
      <div class="column">
        <Hero title="Mis contraseñas" body="Administra tus contraseñas" />
      </div>
    </div>
    <div class="container">
      <div class="columns">
        <div class="column">
          <table-custom />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "../components/password/Table";
import Hero from "../components/home/Hero";
export default {
  name: "password",
  components: {
    "table-custom": Table,
    Hero,
  },
};
</script>
<style></style>
