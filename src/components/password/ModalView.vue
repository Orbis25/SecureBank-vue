<template>
  <section>
    <b-modal
      :active.sync="isVisible"
      @close="changeStateModal(false)"
      :width="640"
      scroll="keep"
    >
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left"></div>
            <div class="media-content">
              <div>
                <b-field label="Nombre de la aplicacion">
                  <b-input
                    v-model="info.companyName"
                    v-if="isVisible"
                    @input="isDisable = true"
                    required
                  ></b-input>
                </b-field>
                <b-field label="Contraseña">
                  <b-input
                    type="password"
                    v-model="info.password"
                    placeholder="Contraseña"
                    password-reveal
                    required
                    @input="isDisable = true"
                    v-if="isVisible"
                  ></b-input>
                </b-field>
                <b-button type="is-success" @click="update()" v-if="isDisable"
                  >Guardar cambios</b-button
                >
              </div>
            </div>
          </div>
          <div class="content">
            Recuerda contraseña siempre estara segura con nosotros
            <small>{{ new Date().toLocaleDateString() }}</small>
          </div>
        </div>
      </div>
    </b-modal>
  </section>
</template>

<script>
/* eslint-disable */
import { mapMutations, mapState } from "vuex";
import firebaseService from "../../services/firebaseService";
import { encrypt } from "../../helpers/encript-helper";

export default {
  name: "modalview",
  props: {
    info: Object,
    state: Boolean,
  },
  data: () => {
    return {
      isDisable: false,
    };
  },
  methods: {
    ...mapMutations(["changeStateModal", ""]),
    async update() {
      let service = new firebaseService();
      this.info.password = encrypt(this.info.password);

      try {
        await service.edit(this.info);
        console.log(this.info);
        this.changeStateModal(false);
        this.$toast.open({
          message: "Actualizado correctamente",
          type: "is-success",
        });
        this.changeStateModal(false);
      } catch (error) {
        this.$toast.open({
          message:
            "Ha ocurrido un error al actualizar lo sentimos, error :" +
            error.message,
          type: "is-danger",
        });
      }
    },
  },

  computed: {
    ...mapState({
      visible: (state) => state.modelvisible,
    }),
    isVisible() {
      return this.visible;
    },
  },
};
</script>

<style></style>
