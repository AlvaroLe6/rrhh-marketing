export const validationSchema = {
    nombre (value) {
      if (value?.length >= 1 ) return true
      return 'El titulo del Libro es obligatorio o muy corto'
    },
  
} 
  
export const imageSchema = {
  imagen (value) {
      if (value) return true
      return 'La Imagen es Obligatoria'
  },
}