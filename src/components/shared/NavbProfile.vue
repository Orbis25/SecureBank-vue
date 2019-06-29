<template>
  <div>
    <b-dropdown class="profile" aria-role="list">
      <p class="tag is-success" slot="trigger" role="button">
        <img :src="information.avatar" :alt="information.avatar">
        <b>{{name}}</b>
      </p>
      <b-dropdown-item aria-role="listitem" @click="logout()">Cerrar sesion</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import firebaseAuth from "../../services/firebaseConfig";
export default {
  name: "navbProfile",
  props: {
    information: Object
  },
  methods: {
    ...mapMutations(["add", ""]),

    logout() {
      let service = new firebaseAuth();
      service
        .loggout()
        .then(() => {
          localStorage.removeItem("session");
          this.add(null);
        })
        .catch(e => {
          alert("error al cerrar la sesion :" + e);
        }).finally(() => this.$router.push('/'))
    }
  },
  computed: {
    name() {
      return this.information.displayName;
    }
  }
};
</script>

<style scoped>
img {
  border-radius: 50em;
  height: auto;
  width: auto;
}
.profile {
  cursor: pointer;
}

.tag {
  height: 2.8em;
}
b {
  margin-left: 3px;
}
</style>
