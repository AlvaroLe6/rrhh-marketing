  <script setup>
import Footer from "@/views/Footer.vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import UserProfile from "@/layouts/UserProfile.vue";

const auth = useAuthStore();
</script>
  <template>
  <v-app>
    <v-app-bar app color="#162D4B" class="app-bar">
      <div class="nav-container">
        <router-link :to="{ name: 'home' }" class="logo-link">
          <img
            src="@/assets/ESCUELA DE NEGOCIOS_HORIZONTAL BLANCO.png"
            alt="Logo"
            height="80"
          />
        </router-link>

        <v-spacer></v-spacer>

        <div class="right-section">
          <div v-if="auth.isAuth">
            <v-btn :to="{ name: 'admin-list-contabilidad' }" class="mr-4">
              Admin
            </v-btn>
          </div>
          <UserProfile v-if="auth.isAuth" />
          <div v-else>
            <v-menu >
              <template v-slot:activator="{ props }">
                <v-btn
                v-bind="props"
                  color="teal-lighten-3"
                  prepend-icon="mdi-check-circle"
                  variant="outlined"
                  class="btn-apply"
                >
                  Postulate
                </v-btn>
              </template>
              <v-list
              class="list"
              
              >
                <v-list-item
                class="list-item"
             
                  v-for="(item, index) in items"
                  :key="index"
                  @click="redirectToView(item.route)"
                >
                  <v-list-item-title
                  color="teal-lighten-3"
                  >{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn :to="{ name: 'login' }"> Iniciar Sesión </v-btn>
          </div>
        </div>
      </div>
    </v-app-bar>
    <v-main style="margin-bottom: 3.125rem">
      <v-container fluid="true">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
  <script>
export default {
  data: () => ({
    items: [
      { title: "Asesor de Marketing", route: 'nuevo-re-contabilidad'},
      { title: "Docente", route:'nuevo-re-contabilidad'},
      { title: "Personal Administrativo", route:'nuevo-re-contabilidad'},
    ],
  }),
  methods: {
    redirectToView(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>
  <style scoped>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo-link {
  margin-right: 16px; /* Ajusta esto para el espacio después del logo */
}

.right-section {
  display: flex;
  align-items: center;
  gap: 16px; /* Ajusta esto para el espacio entre los elementos */
}
.logo-link {
  margin-right: 16px; /* Ajusta esto para el espacio después del logo */
}
.list {
  color: #4DB6AC;
}

.list-item{
  color: #4DB6AC;
    
}
</style>