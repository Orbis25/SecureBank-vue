<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <p>
        <strong>SecureBank</strong>
        <a href="https://orbis25.github.io/Personal-Site/index.html"> </a>
        {{ day }}
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footer",
  data: () => {
    return {
      day: `${new Date().getDate()}/${new Date().getMonth() +
        1}/${new Date().getFullYear()}`,
    };
  },
};
</script>

<style>
footer {
  bottom: 0;
}
</style>
