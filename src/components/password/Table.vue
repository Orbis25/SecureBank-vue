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
          <button
            class="button"
            @click="
              currentPage = 2;
              isCardModalActive = true;
            "
          >
            Nueva
          </button>
        </div>
      </b-field>

      <div class="control" style="margin: 10px;">
        <b-field>
          <b-input
            v-model="searchText"
            placeholder="busqueda"
            rounded
          ></b-input>
        </b-field>
      </div>

      <b-table
        :data="filteredData"
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
            >{{ props.row.companyName }}</b-table-column
          >
          <b-table-column
            field="date"
            label="Fecha de creacion"
            sortable
            centered
          >
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
          <b-loading
            :is-full-page="false"
            :active.sync="isLoadingTable"
            :can-cancel="false"
          ></b-loading>
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
              <small>{{ new Date().toLocaleDateString() }}</small>
            </div>
          </div>
        </div>
        <b-loading
          :is-full-page="false"
          :active.sync="isLoading"
          :can-cancel="false"
        ></b-loading>
      </b-modal>
      <Detail :info="infoPass" />
    </section>
  </div>
</template>

<script>
import firebaseService from "../../services/firebaseService";
import uid from "uuid";
import Detail from "../../components/password/ModalView";
import { mapMutations } from "vuex";
import { encrypt, decrypt } from "../../helpers/encript-helper";

export default {
  components: {
    Detail,
  },
  data() {
    return {
      data: [],
      firebaseData: [],
      form: {
        id: uid(),
        password: "",
        companyName: "",
        createdAt: new Date().toLocaleDateString(),
        key: "",
      },
      infoPass: null,
      isLoading: false,
      isPaginated: true,
      isPaginationSimple: false,
      defaultSortDirection: "asc",
      currentPage: 1,
      perPage: 20,
      isCardModalActive: false,
      isLoadingTable: false,
      searchText: "",
    };
  },
  async created() {
    await this.getAll();
  },
  methods: {
    ...mapMutations(["changeStateModal", ""]),
    async getAll() {
      this.isLoadingTable = true;

      try {
        let response = await new firebaseService().getAll();
        const values = response.val();

        if (values !== null) {
          const objects = Object.values(values);
          this.firebaseData = Object.keys(values);
          this.data = objects.map(({ id, createdAt, companyName }, index) => {
            return {
              id,
              createdAt,
              companyName,
              key: this.firebaseData[index],
            };
          });
        }
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoadingTable = false;
      }
    },

    async add() {
      if (this.form.password != null && this.form.companyName != null) {
        this.isLoading = true;
        const service = new firebaseService();

        this.form.password = encrypt(this.form.password);

        try {
          await service.add(this.form);
          this.$toast.open({
            message: "Agregado correctamente!",
            type: "is-success",
          });
          this.getAll();
        } catch (error) {
          this.$toast.open({
            message: `Lo sentimos ha ocurrido un error ${error.message}`,
            type: "is-danger",
          });
        } finally {
          this.isCardModalActive = false;
          this.isLoading = false;
          this.form.password = "";
          this.form.companyName = "";
        }
      } else {
        this.$toast.open({
          message: `Porfavor llene los campos`,
          type: "is-danger",
        });
      }
    },

    async findById(id) {
      this.changeStateModal(true); //open modal
      let service = new firebaseService();

      try {
        let response = await service.findById(id);
        let object = response.val();
        this.infoPass = {
          id: object.id,
          companyName: object.companyName,
          password: decrypt(object.password),
          createdAt: object.createdAt,
        };
      } catch (error) {
        this.$toast.open({
          message: `Lo sentimos ha ocurrido un error ${error.message}`,
          type: "is-danger",
        });
      }
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
        },
      });
    },
  },

  computed: {
    filteredData() {
      return this.data.filter((item) =>
        item.companyName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
  },
};
</script>
