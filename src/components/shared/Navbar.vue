<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" tag="a" class="navbar-item icon-nav">
          <h1 class="firts-letter">S</h1>
          <p class="start-icon-nav">ecure</p>Bank
        </router-link>
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="true"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" tag="a" class="navbar-item">Inicio</router-link>
          <router-link to="/passwords" tag="a" v-if="isLogged" class="navbar-item">Mis contraseñas</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" v-if="!isLogged">
              <a class="button is-primary" @click="isCardModalActive = true;auth()">
                <strong>Entrar con Google</strong>
              </a>
            </div>
            <NavbProfile :information="infoAuth" v-if="isLogged"/>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import firebaseAuth from "../../services/firebaseConfig";
import NavbProfile from "../../components/shared/NavbProfile";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Navbar",
  components: {
    NavbProfile
  },
  data: () => {
    return {
      isCardModalActive: false,
      data: null
    };
  },
  methods: {
    ...mapMutations(["add", ""]),
    auth() {
      let service = new firebaseAuth();
      service.authorization().then(() => {
        this.data = JSON.parse(localStorage.getItem("session"));
        this.add(this.data);
      });
    }
  },
  computed: {
    ...mapState({
      firebaseData: state => state.data
    }),
    infoAuth() {
      return this.firebaseData;
    },
    isLogged() {
      return this.firebaseData != null ? true : false;
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
</script>

<style>
.firts-letter {
  color: blueviolet;
  font-size: 25px;
}
.start-icon-nav {
  color: blueviolet;
}
</style>
