<script setup>
import { ref } from "vue";
import { useStateCheckbox } from '@/stores/stateCheckbox';

const stateCheckbox = useStateCheckbox();

function toggleCheckbox(type) {
  console.log('Toggling Checkbox:', type);
  switch (type) {
    case 'marketing':
    stateCheckbox.toggleMarketing();
      break;
    case 'admin':
    stateCheckbox.toggleAdmin();
      break;
    case 'docente':
    stateCheckbox.toggleDocente();
      break;
  }
  console.log('Marketing Disabled:', stateCheckbox.marketingDisabled);
  console.log('Admin Disabled:', stateCheckbox.adminDisabled);
  console.log('Docente Disabled:', stateCheckbox.docenteDisabled);
}
</script>

<template>
  <v-card class="pa-4">
    <v-card-title> Desactivar enlaces de los formularios </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-checkbox
            v-model="stateCheckbox.marketingDisabled"
            label="Desactivar el formulario de marketing"
            @change="() => toggleCheckbox('marketing')"
            ></v-checkbox>
          <v-row align="center">
            <v-col cols="9">
              <p>http://localhost:5173/admin/list_contabilidad</p>
            </v-col>
            <v-col cols="3">
              <v-btn  prepend-icon="mdi-link-variant">Copiar</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="stateCheckbox.adminDisabled"
            label="Desactivar el formulario de administrativo"
           
          ></v-checkbox>
          <v-row align="center">
            <v-col cols="9">
              <p>http://localhost:5173/admin/list_contabilidad</p>
            </v-col>
            <v-col cols="3">
              <v-btn prepend-icon="mdi-link-variant">Copiar</v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="stateCheckbox.docenteDisabled"
            label="Desactivar el formulario de docentes"
          
          ></v-checkbox>
          <v-row align="center">
            <v-col cols="9">
              <p>http://localhost:5173/admin/list_contabilidad</p>
            
            </v-col>
            <v-col cols="3">
              <v-btn prepend-icon="mdi-link-variant">Copiar</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row justify="center" class="mt-4">
        <v-btn color="success" :disabled="!stateCheckbox.marketingDisabled && !stateCheckbox.adminDisabled && !stateCheckbox.docenteDisabled"> Guardar </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style>
.checkbox-group {
  display: flex;
  flex-direction: column;
}
</style>