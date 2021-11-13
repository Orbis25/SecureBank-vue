<template>
  <div>
    <Hero
      title="SecureBank"
      body="El lugar donde todas tus contraseñas estan seguras"
    />
    <div class="container mt-3">
      <div class="columns">
        <div class="column">
          <strong class="first-letter">O</strong>
          <p style="display:inline;">
            lvidate de los hackers y tambien de dejar tus contraseñas escritas
            en archivos de texto en la nube
          </p>
        </div>
        <div class="column">
          <img
            class="animated pulse delay-3s"
            src="@/assets/undraw_hacker_mind_6y85.svg"
            alt
          />
        </div>
      </div>
      <div class="columns mt-3">
        <div class="column">
          <img
            class="animated pulse delay-4s"
            src="@/assets/undraw_mobile_images_rc0q.svg"
            alt
          />
        </div>
        <div class="column">
          <strong class="first-letter">A</strong>
          <p style="display:inline;">
            ccede desde cualquier parte sin problemas desde cualquier dipositivo
          </p>
        </div>
      </div>
      <div class="columns mt-3">
        <div class="column">
          <strong class="first-letter">M</strong>
          <p style="display:inline;">
            anten todas tus contraseñas siempre seguras, utilizamos algoritmos
            para encriptar tus contraseñas asi que descuida.
          </p>
        </div>
        <div class="column">
          <img
            class="animated pulse delay-5s"
            src="@/assets/undraw_secure_data_0rwp.svg"
            alt
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hero from "../components/home/Hero";

export default {
  name: "home",
  components: {
    Hero,
  },
};
</script>

<style Scoped>
.first-letter {
  font-size: 70px;
  color: blueviolet;
}
</style>
