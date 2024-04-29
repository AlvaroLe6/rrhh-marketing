import { ref } from 'vue'
import { ref as storageRef,uploadBytes, getDownloadURL } from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'
import { uid } from 'uid'

export default function useFileUpload() {

    const storage = useFirebaseStorage()
    const fileUrl = ref(null); // Ref para la URL del archivo

    async function uploadFile(event){
        return new Promise(async (resolve, reject) => {
        const file = event.target.files[0]
        if(file){

            // Determina la extensión del archivo y crea una referencia única
            const fileExtension = file.name.split('.').pop().toLowerCase();
            const allowedExtensions = ['pdf', 'docx']; // Extensiones permitidas

            if (!allowedExtensions.includes(fileExtension)) {
                console.error('Tipo de archivo no permitido. Solo se permiten archivos PDF y DOCX.');
                return;
            }

            const fileRef = storageRef(storage,`/re_applicants/${uid()}.${fileExtension}`)

            // Inicia la carga del archivo
            try {
                const uploadResult = await uploadBytes(fileRef, file);
                const downloadURL = await getDownloadURL(uploadResult.ref);
                fileUrl.value = downloadURL; // Establece la URL del archivo subido
            } catch (error) {
                console.error("Error uploading file: ", error);
                reject(error); // Rechaza la promesa si hay un error
                // Manejar errores de carga aquí
            }
        } 

     } );
    }
    return {
        url: fileUrl,
        uploadFile
    }
}