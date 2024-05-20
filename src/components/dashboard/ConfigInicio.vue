<script setup>
import { ref } from 'vue';

const confirmMarketing = ref(false);
const confirmAdmin = ref(false);
const confirmDocente = ref(false);
</script>

<template>
  <v-card class="pa-4">
    <v-card-title>
      Desactivar enlaces de los formularios
    </v-card-title>
    <v-card-text>
      <div class="checkbox-group">
        <v-checkbox
          v-model="confirmMarketing"
          label="Confirmo la desactivación del formulario de marketing"
        ></v-checkbox>
        <v-checkbox
          v-model="confirmAdmin"
          label="Confirmo la desactivación del formulario de administrativo"
        ></v-checkbox>
        <v-checkbox
          v-model="confirmDocente"
          label="Confirmo la desactivación del formulario de docentes"
        ></v-checkbox>
      </div>
      <v-btn
        color="success"
        :disabled="!confirmMarketing"
      >
      Guardar
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style>
.checkbox-group {
  display: flex;
  flex-direction: column;
}

</style>