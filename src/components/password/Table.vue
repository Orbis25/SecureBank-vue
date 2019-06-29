<template>
  <div>
    <section>
      <b-field grouped group-multiline>
        <b-select v-model="defaultSortDirection">
          <option value="asc">Acendente</option>
          <option value="desc">Decendente</option>
        </b-select>
        <b-select v-model="perPage" :disabled="!isPaginated">
          <option value="5">5 por pagina</option>
          <option value="10">10 por pagina</option>
          <option value="15">15 por pagina</option>
          <option value="20">20 por pagina</option>
        </b-select>
        <div class="control">
          <button class="button" @click="currentPage = 2;isCardModalActive = true">Nueva</button>
        </div>
      </b-field>

      <b-table
        :data="data"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :default-sort-direction="defaultSortDirection"
        default-sort="companyName"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <template slot-scope="props">
          <b-table-column
            field="companyName"
            label="Nombre de Aplicacion"
            sortable
          >{{ props.row.companyName }}</b-table-column>
          <b-table-column field="date" label="Fecha de creacion" sortable centered>
            <span class="tag is-success">{{ props.row.createdAt }}</span>
          </b-table-column>

          <b-table-column label="Accion">
            <button
              style="margin:2px;"
              @click="findById(props.row.key)"
              class="button is-primary is-small"
            >
              <span>Ver</span>
            </button>
            <button
              @click="remove(props.row.key)"
              style="margin:2px;"
              class="button is-danger is-small"
            >
              <span>eliminar</span>
            </button>
          </b-table-column>
          <b-loading :is-full-page="false" :active.sync="isLoadingTable" :can-cancel="false"></b-loading>
        </template>
      </b-table>
    </section>
    <section>
      <b-modal :active.sync="isCardModalActive" :width="640" scroll="keep">
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left"></div>
              <div class="media-content">
                <div>
                  <b-field label="Nombre de la aplicacion">
                    <b-input v-model="form.companyName" required></b-input>
                  </b-field>
                  <b-field label="Contraseña">
                    <b-input
                      type="password"
                      v-model="form.password"
                      placeholder="Contraseña"
                      password-reveal
                      required
                    ></b-input>
                  </b-field>
                  <b-button type="is-success" @click="add()">Guardar</b-button>
                </div>
              </div>
            </div>

            <div class="content">
              Tu contraseña siempre estara segura con nosotros!
              <small>{{new Date().toLocaleDateString()}}</small>
            </div>
          </div>
        </div>
        <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
      </b-modal>
      <Detail :info="infoPass"/>
    </section>
  </div>
</template>

<script>
import firebaseService from "../../services/firebaseService";
import uid from "uuid";
import criptojs from "crypto-js";
import Detail from "../../components/password/ModalView";
import { mapMutations } from "vuex";
export default {
  components: {
    Detail
  },
  data() {
    return {
      data: [],
      firebaseData: [],
      form: {
        id: uid(),
        password: null,
        companyName: null,
        createdAt: new Date().toLocaleDateString(),
        key: null
      },
      infoPass: null,
      isLoading: false,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 5,
      isCardModalActive: false,
      isLoadingTable: false
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    ...mapMutations(["changeStateModal", ""]),
    getAll() {
      this.isLoadingTable = true;
      let service = new firebaseService().getAll();
      service
        .then(r => {
          let data = [];
          let objects = Object.values(r.val());
          this.firebaseData = Object.keys(r.val());
          for (let i = 0; i < objects.length; i++) {
            data.push({
              id: objects[i].id,
              createdAt: objects[i].createdAt,
              companyName: objects[i].companyName,
              key: this.firebaseData[i]
            });
          }
          this.data = data;
        })
        .finally(() => (this.isLoadingTable = false));
    },
    add() {
      if (this.form.password != null && this.form.companyName != null) {
        this.isLoading = true;
        let service = new firebaseService();
        this.form.password = this.encrypt(this.form.password);
        service
          .add(this.form)
          .then(() => {
            this.$toast.open({
              message: "Agregado correctamente!",
              type: "is-success"
            });
            this.getAll();
          })
          .catch(() => {
            this.$toast.open({
              message: `Lo sentimos ha ocurrido un error`,
              type: "is-danger"
            });
          })
          .finally(() => {
            this.isCardModalActive = false;
            this.isLoading = false;
            this.form.password = null;
            this.form.companyName = null;
          });
      } else {
        this.$toast.open({
          message: `Porfavor llene los campos`,
          type: "is-danger"
        });
      }
    },
    async findById(id) {
      this.changeStateModal(true); //open modal
      let service = new firebaseService();
      await service.findById(id).then(r => {
        this.infoPass = r.val();
        this.infoPass.key = id;
        this.infoPass.password = this.decrypt(this.infoPass.password);
      });
    },
    remove(id) {
      this.$dialog.confirm({
        title: "Eliminando Elemento",
        message: "Estas seguro que deseas eliminarlo",
        type: "is-danger",
        hasIcon: true,
        onConfirm: () => {
          let service = new firebaseService();
          service.remove(id);
          this.$toast.open("Eliminado!");
          this.getAll();
        }
      });
    },
    encrypt(value) {
      return criptojs.AES.encrypt(value, "").toString();
    },
    decrypt(value) {
      return criptojs.AES.decrypt(value.toString(), "").toString(
        criptojs.enc.Utf8
      );
    }
  }
};
</script>