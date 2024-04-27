<script setup>
import { useForm, useField } from "vee-validate";
import { collection, setDoc, getDocs, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { useRouter } from "vue-router";
import {
  validationSchema,
  imageSchema,
} from "@/validation/contabilidadSchema.js";
import useImage from "@/composables/useImage";
import { ref } from "vue";

const fechaFin = ref(new Date().toISOString().substr(0, 10));
const db = useFirestore();
const router = useRouter();

const snackbar = ref(false);
const snackbarMessage = ref("");

console.log("fechaFin", fechaFin.value);
const { handleSubmit } = useForm({
  validationSchema: {
    ...validationSchema,
    ...imageSchema,
  },
});

const { url, uploadImage, image } = useImage();

const nombre = useField("nombre");
const apellido = useField("apellido");
const nroCarnet = useField("nroCarnet");
const email = useField("email");
const celular = useField("celular");
const edad = useField("edad");
const profesion = useField("profesion");
const comtExpArea = useField("comtExpArea");
const ciudadR = useField("ciudadR");
const ciudades = ["Cobija",
                  "Cochabamba",
                  "El Alto",
                  "La Paz",
                  "Oruro",
                  "Potosí",
                  "Santa Cruz de la Sierra",
                  "Sucre",
                  "Tarija",
                  "Trinidad",
                      ];
const imagen = useField("imagen");

const submit = handleSubmit(async (values) => {
  const { imagen, ...re_applicants } = values;

  let originalId = "COD-RP-";
  let contador = 1;

  const queryID = await getDocs(collection(db, "re_applicants"));
  queryID.forEach((doc) => {
    const id = doc.id;
    const partes = id.split("-");
    const secuencia = partes[partes.length - 1]; // Obtiene el último elemento del array
    if (secuencia && !isNaN(secuencia)) {
      const numSecuencia = parseInt(secuencia);
      if (numSecuencia >= contador) {
        contador = numSecuencia + 1;
      }
    }
  });

  const generateNewId = () => {
    return `${originalId}${contador}`;
  };
  let generatedId = generateNewId();
  try {
    const docRef = await setDoc(
      doc(collection(db, "re_applicants"), generatedId),
      {
        ...re_applicants,
        image: url.value,
        idRegCaja: generatedId,
        fecha: fechaFin.value,
        estado: true,
      }
    );
    console.log("Documento guardado correctamente.");
    snackbar.value = true;
    snackbarMessage.value = "Tu solicitud ha sido guardada exitosamente.";

    // Redirige al usuario a la lista de registros
    setTimeout(() => {
      router.push({ name: "home" });
    }, 2000); // Muestra el snackbar por 2 segundos antes de redirigir
  } catch (error) {
    console.error("Error al guardar el documento en Firestore:", error);
    snackbar.value = true;
    snackbarMessage.value =
      "Error al guardar el documento. Por favor, intenta de nuevo.";
  }
});
</script>
    

<template>

  <v-card elevation="3" max-width="800" flat class="card mx-auto my-10">
    <v-snackbar 
    v-model="snackbar"
    top
    right
    color="green"
    :timeout = "3000"
    >
      {{ snackbarMessage }}
        <v-btn color="white" text @click="snackbar = false">
          Cerrar
        </v-btn>
    </v-snackbar>
    <v-card-title class="text-h4 font-weight-bold" tag="h3">
      Formulario
    </v-card-title>

    <v-card-subtitle class="text-h5 py-5">
      Postúlate llenando el siguiente formulario
    </v-card-subtitle>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex"> </v-card-title>
          <VDivider />

          <v-card-title>
            <!-- Formulario -->
            <VForm class="mt-6">
              <v-row>
                <!-- Nombre -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="nombre.value.value"
                    label="Nombres"
                    variant="outlined"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <!-- Apellido -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="apellido.value.value"
                    label="Apellidos"
                    variant="outlined"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <!-- Numero de carnet -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="nroCarnet.value.value"
                    label="Documento de identidad"
                    variant="outlined"
                    persistent-hint
                  ></v-text-field>
                </v-col>
                <!-- Correo electrónico -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="email.value.value"
                    label="Correo electrónico"
                    variant="outlined"
                    persistent-hint
                  ></v-text-field>
                </v-col>

                <!-- Celular -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="celular.value.value"
                    label="Celular"
                    variant="outlined"
                    persistent-hint
                  ></v-text-field>
                </v-col>

                <!-- Edad -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="edad.value.value"
                    label="Edad"
                    variant="outlined"
                    persistent-hint
                  ></v-text-field>
                </v-col>

                <!-- Profesión -->
                <v-col md="6" cols="12">
                  <v-text-field
                    v-model="profesion.value.value"
                    label="Profesión"
                    variant="outlined"
                    persistent-hint
                  ></v-text-field>
                </v-col>

                <!-- Ciudad de recidencia -->
                <v-col md="6" cols="12">
                  <v-select
                  v-model="ciudadR.value.value"
                  label="Ciudad de recidencia"
                  :items="ciudades" 
                  outlined
                  variant="outlined"
                  persistent-hint
                  ></v-select>
                </v-col>

                <!-- Coméntanos tu experiencia en el área -->
                <v-col md="12" cols="12">
                  <v-textarea
                    v-model="comtExpArea.value.value"
                    label="Coméntanos tu experiencia en el área"
                    variant="outlined"
                    persistent-hint
                  ></v-textarea>
                </v-col>

                <!-- Columna de la imagen -->
                <v-col cols="12" md="4">
                  <v-file-input
                    variant="outlined"
                    persistent-hint
                    accept="image/jpeg"
                    label="C.V."
                    prepend-icon="mdi-cloud-upload"
                    class="ma-2"
                    color="indigo"
                    v-model="imagen.value.value"
                    :error-messages="imagen.errorMessage.value"
                    @change="uploadImage"
                  />
                  <div v-if="image" class="my-5">
                    <p class="font-weight-bold">Imagen</p>
                    <img class="w-50" :src="image" />
                  </div>
                </v-col>

                <!-- Acciones del Formulario -->
                <v-col cols="12" class="d-flex flex-wrap gap-4">
                  <VBtn @click="submit">Guardar</VBtn>

                  <VBtn
                    color="secondary"
                    variant="outlined"
                    type="reset"
                    @click.prevent=""
                  >
                    Borrar
                  </VBtn>
                </v-col>
              </v-row>
            </VForm>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>
<style>
.card {
  border-right: solid;
  border-width: solid;
  color: #cdcdcd;
}
.text-h4 {
  background-color: #7a9cc6;
  color: white;
}
</style>

