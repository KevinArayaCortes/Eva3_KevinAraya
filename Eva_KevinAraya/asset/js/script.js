import { actualizarConsulta, eliminarConsulta, obtenerConsultas, registrarConsulta } from "./promesa.js";
//importa las funciones de promesas.js
window.addEventListener("load",()=>{
    document.getElementById("btnEnviar").addEventListener("click",Validar);
    document.getElementById("contraste").addEventListener("click",contraste);
    document.getElementById("fuente").addEventListener("click",fuente);
    document.getElementById("btnActualizar").addEventListener("click",actualizar);
    cargarDatos();
});
//Carga las funciones y las asigna

const registrar = ()=>{
let enombre = document.getElementById("Nombre");
let eapellido = document.getElementById("Apellido");
let ecorreo = document.getElementById("Correo");
let efdn = document.getElementById("Fdn");
let etel = document.getElementById("Tel");
let eselect = document.getElementById("select");
let egenero = document.querySelector('input[name="G"]:checked');
let easunto = document.getElementById("Asunto");
//Recupera los elementos por id
let vNombre = enombre.value
let vApellido = eapellido.value
let vCorreo = ecorreo.value
let vFdn = efdn.value
let vGenero = egenero.value
let vTel = etel.value
let vSelect = eselect.value
let vAsunto = easunto.value
//Recupera el valor de los elementos
let objeto = {nombre:vNombre,apellido:vApellido,correo:vCorreo,fecha:vFdn,genero:vGenero,telefono:vTel,desea:vSelect,asunto:vAsunto}
//Crea el objeto con los valores
registrarConsulta(objeto).then(()=>{
//Envia el objeto
alert("Se registro exitosamente");
cargarDatos();
//Carga los datos en la tabla
}).catch((error)=>{
console.log(error)
});
};
//Registra los datos en la base de datos

function Validar(){
    validarVacio("Nombre");
    validarVacio("Apellido");
    validarVacio("Correo");
    validarVacio("Asunto");
    validarVacio("Fdn");
    validarlongitud("Tel");
    validarRadio("G")
    registrar()
};
//Valida todos los campos

function validarVacio(idElemento){
    let elemento = document.getElementById(idElemento);
    let valor = elemento.value;
    let pElemento = document.getElementById("p"+idElemento);
    if (valor.trim()==""){
        elemento.style.borderColor = "red";
        pElemento.style.display = "block";
    //Si el valor recuperado esta vacio muestra el error y el borde se vuelve rojo
    }else{
        if (isNaN(valor)){
            //Comprueba si los datos son caracteres
            elemento.style.borderColor = "green";
            pElemento.style.display = "none";
        }else{
            elemento.style.borderColor = "red";
            pElemento.style.display = "block";
            //Si no son caracteres muestra error y el borde se vuelve rojo
        };
    };
};
//Valida que los campos no esten vacio

function validarlongitud(idElemento){
    let elemento = document.getElementById(idElemento);
    let valor = elemento.value;
    let pElemento = document.getElementById("p"+idElemento);
    if(isNaN(valor)){
    //Comprueba si los datos son caracteres
        pElemento.innerText = "Debes ingresar un numero";
        pElemento.style.display = "block";
    }else{
        if(valor.trim().length == 9 || valor.trim().length == 0 ){
        //Si la longitud del valor es de 9 o 0 no muestra error y el borde se vulve verde
            elemento.style.borderColor = "green";
            pElemento.style.display = "none";
        }else{
            elemento.style.borderColor = "red";
            pElemento.style.display = "block";
            //Si no lo es muestra error y el borde rojo
        };
    };
};
//Valida que el campo solo sea numerico y este vacio o solo con 9 digitos

function validarRadio(name){
    let pElemento = document.getElementById("p"+name);
    if (document.querySelector('input[name="G"]:checked')){
    //Si recupera no muestra error
        pElemento.style.display = "none";
    }else{
        pElemento.style.display = "block"
        //Si no recupera por campo no marcado muestra error
}
};
//Valida que el radio este marcado

const cargarDatos = ()=>{
    //Traer de las promesas todo lo registrado
    obtenerConsultas().then((consulta)=>{
        let estructuras = ""
        consulta.forEach((p)=>{
        //Recorre el objeto para recuperar sus datos
            estructuras += "<tr>"
            estructuras += "<td>"+p.nombre+"</td>"
            estructuras += "<td>"+p.apellido+"</td>"
            estructuras += "<td>"+p.correo+"</td>"
            estructuras += "<td>"+p.fecha+"</td>"
            estructuras += "<td>"+p.genero+"</td>"
            estructuras += "<td>"+p.telefono+"</td>"
            estructuras += "<td>"+p.desea+"</td>"
            estructuras += "<td>"+p.asunto+"</td>"
            estructuras += "<td><button id='UPD"+p.id+"'>Editar</button></td>"
            estructuras += "<td><button id='DEL"+p.id+"'>Eliminar</button></td>"
            //Crea los botones actualizar y eliminar de los datos
            estructuras += "</tr>";
        })
        document.getElementById("cuerpoTabla").innerHTML = estructuras;
        //Carga abajo del formulario los datos en una tabla

        consulta.forEach((p)=>{
            let elemento = document.getElementById("UPD"+p.id);
            elemento.addEventListener("click",()=>{
                document.getElementById("Nombre").value = p.nombre;
                document.getElementById("Apellido").value = p.apellido;
                document.getElementById("Correo").value = p.correo;
                document.getElementById("Fdn").value = p.fecha;
                document.getElementById("G").value = p.genero;
                document.getElementById("Tel").value = p.telefono;
                document.getElementById("select").value = p.desea;
                document.getElementById("Asunto").value = p.asunto;
                document.getElementById("btnActualizar").value = p.id;
                //Crea el boton actualizar
            });
            //Carga los datos seleccionados en el formulario
            let btnEliminar = document.getElementById("DEL"+p.id);
            btnEliminar.addEventListener("click",()=>{
                if(confirm("Desea eliminar a:\n"+p.nombre+" "+p.apellido)){
                //Salta alerta para confirmar o cancelar la eliminacion
                    console.log("Vamos a eliminar")
                    eliminarConsulta(p.id).then(()=>{
                        //Elimina los datos
                        alert("Eliminaste con exito");
                        cargarDatos();
                    }).catch((e)=>{
                        console.log(e)
                    })
                }else{
                    alert("Cancelaste la eliminacion")
                }
            //Al presionar el boton eliminar salta una alerta para eliminar sus datos
            })
        })
    })
};

const actualizar=()=>{
let enombre = document.getElementById("Nombre");
let eapellido = document.getElementById("Apellido");
let ecorreo = document.getElementById("Correo");
let efdn = document.getElementById("Fdn");
let etel = document.getElementById("Tel");
let eselect = document.getElementById("select");
let egenero = document.querySelector('input[name="G"]:checked');
let easunto = document.getElementById("Asunto");
//Recupera los elementos por el id
let vNombre = enombre.value
let vApellido = eapellido.value
let vCorreo = ecorreo.value
let vFdn = efdn.value
let vGenero = egenero.value
let vTel = etel.value
let vSelect = eselect.value
let vAsunto = easunto.value
//Recupera el valor de los elementos
let objeto = {nombre:vNombre,apellido:vApellido,correo:vCorreo,fecha:vFdn,genero:vGenero,telefono:vTel,desea:vSelect,asunto:vAsunto}
//Crea el objeto
let id = document.getElementById("btnActualizar").value
document.getElementById("btnActualizar").disabled = "True";
//Desactiva el boton actualizar

actualizarConsulta(objeto,id).then(()=>{
//Envio el objeto y el id a las promesas
    alert("Se actualiza con exito");
    cargarDatos();
}).catch((e)=>{
    console.log(e)
}).finally(()=>{
    document.getElementById("btnActualizar").disabled = "";
    //Activa el boton actualizar
})
};
//Actualiza los datos al presionar el boton actualizar

function contraste(){
    let tema = document.getElementsByClassName("Oscuro");
    for (let idx = 0; idx<tema.length; idx++){
        //Recorre los elementos recuperados
        let rIdx = tema[idx];
        rIdx.classList.toggle("Claro");
    };
};
//Cambia el contraste de la pagina al presionar el boton

function fuente(){
    let tamanio = document.getElementById("body");
    if (tamanio.classList.contains("Normal")){
        tamanio.classList.replace("Normal","Aumento1");
        //Si tiene asignada la clase la remplaza
    }else
    if (tamanio.classList.contains("Aumento1")){
        tamanio.classList.replace("Aumento1","Aumento2");
    }else
    if (tamanio.classList.contains("Aumento2")){
        tamanio.classList.replace("Aumento2","Aumento3");
    }else
    if (tamanio.classList.contains("Aumento3")){
        tamanio.classList.replace("Aumento3","Normal");
    };
};
//Cambia el tamaño de la fuente en 3 posibles y lo vuelve a la normalidad al ir presionando el boton