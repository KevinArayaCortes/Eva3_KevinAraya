import { db } from "./firebase.js";
//Importa desde firebase
import { addDoc, collection, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
//Importa desde firestore
export const registrarConsulta = async(consulta)=>{
    //Exporta la funcion registrar
    const docRef = await addDoc(collection(db, "consultas"), consulta);
}

export const obtenerConsultas = async()=>{
    const ref = collection(db, "consultas");
    // Recupera la referencia (ruta)
    const qSnap = await getDocs(ref);
    let listado = []
    qSnap.forEach((doc) => {
        listado.push({...doc.data(),id:doc.id})
    });
    return listado;
    //Retorna el listado
}

export const actualizarConsulta = async(objeto,id)=>{
    //Exporta la funcion actualizar
    const ref = doc(db,"consultas",id);
    await updateDoc(ref,objeto);
}

export const eliminarConsulta = async(id)=>{
    //Exporta la funcion eliminar
    const ref = doc(db,"consultas",id);
    await deleteDoc(ref);
}